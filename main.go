package main

import (
	"embed"
	"io"
	"io/fs"
	"log"
	"mime"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sync"
	"time"

	_ "modernc.org/sqlite"
)

func init() {
	// Asegurar MIME types correctos en Windows (evita pantalla blanca por type="module")
	mime.AddExtensionType(".js", "application/javascript")
	mime.AddExtensionType(".css", "text/css")
}

//go:embed frontend/dist
var frontendFiles embed.FS

// Función para descargar archivos (videos) desde un servidor externo
func descargarVideo(url string, dest string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	out, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	return err
}

func main() {
	// Configurar logs a un archivo (Indispensable ya que ocultaremos la terminal)
	f, _ := os.OpenFile("debug.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if f != nil {
		defer f.Close()
		log.SetOutput(f)
	}
	log.Println("Iniciando aplicación OVA...")

	// 1. Inicializar Base de Datos (debe estar definida en database.go)
	iniciarDB()

	// --- GESTIÓN DE VIDEOS LOCALES ---
	exePath, _ := os.Executable()
	baseDir := filepath.Dir(exePath)
	videoDir := filepath.Join(baseDir, "videos")

	// Crear carpeta de videos si no existe al lado del .exe
	if _, err := os.Stat(videoDir); os.IsNotExist(err) {
		os.Mkdir(videoDir, 0755)
	}

	// Descarga asíncrona de videos (para no bloquear el inicio de la app)
	go func() {
		// Ejemplo de video: añade aquí todos los que necesites
		videoDest := filepath.Join(videoDir, "introduccion.mp4")
		if _, err := os.Stat(videoDest); os.IsNotExist(err) {
			log.Println("Descargando video faltante: introduccion.mp4")
			// REEMPLAZA ESTA URL POR LA REAL
			urlVideo := "https://tu-servidor.com/videos/introduccion.mp4"
			err := descargarVideo(urlVideo, videoDest)
			if err != nil {
				log.Println("Error descargando video:", err)
			} else {
				log.Println("Descarga completada: introduccion.mp4")
			}
		}
	}()

	// Servidor de archivos para la carpeta de videos local
	videoFS := http.FileServer(http.Dir(videoDir))
	http.Handle("/videos/", http.StripPrefix("/videos/", videoFS))

	// --- SERVIR FRONTEND EMBEBIDO ---
	distFS, err := fs.Sub(frontendFiles, "frontend/dist")
	if err != nil {
		log.Fatal("Error al acceder al frontend embebido:", err)
	}

	// Registro de rutas API (deben estar en handlers.go)
	http.HandleFunc("/api/items", handlerItems)
	http.HandleFunc("/api/items/crear", handlerCrearItem)

	// --- SISTEMA DE LATIDOS (HEARTBEAT) ---
	// Mantiene vivo el backend solo si el frontend está abierto
	var lastPing time.Time
	var pingMu sync.Mutex
	lastPing = time.Now()

	http.HandleFunc("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		pingMu.Lock()
		lastPing = time.Now()
		pingMu.Unlock()
		w.WriteHeader(http.StatusOK)
	})

	// Monitor en segundo plano
	go func() {
		// Damos 20 segundos iniciales de gracia mientras carga el navegador
		time.Sleep(20 * time.Second)
		for {
			pingMu.Lock()
			passed := time.Since(lastPing)
			pingMu.Unlock()

			// Si pasan más de 10 segundos sin latidos, cerramos
			if passed > 10*time.Second {
				log.Println("Frontend cerrado. Apagando el servidor en segundo plano...")
				os.Exit(0)
			}
			time.Sleep(5 * time.Second)
		}
	}()

	// Servir el frontend en la raíz
	http.Handle("/", http.FileServer(http.FS(distFS)))

	// --- AUTO-APERTURA DEL NAVEGADOR ---
	url := "http://localhost:8088"

	abrirNavegador := func() {
		var cmd *exec.Cmd
		if runtime.GOOS == "windows" {
			cmd = exec.Command("cmd", "/c", "start", url)
		} else {
			cmd = exec.Command("xdg-open", url)
		}
		if cmd != nil {
			cmd.Start()
		}
	}

	// Comprobar si el puerto ya está en uso (si la app ya estaba abierta de fondo)
	l, err := net.Listen("tcp", ":8088")
	if err != nil {
		log.Println("La aplicación ya está corriendo. Abriendo el navegador...")
		abrirNavegador()
		return
	}

	go func() {
		time.Sleep(2 * time.Second)
		abrirNavegador()
	}()

	log.Println("Servidor corriendo en", url)
	if err := http.Serve(l, nil); err != nil {
		log.Fatal("Error al iniciar servidor:", err)
	}
}
