package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"time"

	_ "modernc.org/sqlite"
)

//go:embed frontend/dist
var frontendFiles embed.FS

func main() {
	// Configurar logs a un archivo para diagnóstico en Windows
	f, _ := os.OpenFile("debug.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if f != nil {
		defer f.Close()
		log.SetOutput(f)
	}
	log.Println("Iniciando aplicación...")

	// 1. Inicializar Base de Datos (desde database.go)
	iniciarDB()

	// 2. Extraer la carpeta dist del embebido
	distFS, err := fs.Sub(frontendFiles, "frontend/dist")
	if err != nil {
		log.Fatal("Error al acceder a los archivos del frontend:", err)
	}

	// 3. Registrar rutas de la API (desde handlers.go)
	http.HandleFunc("/api/items", handlerItems)
	http.HandleFunc("/api/items/crear", handlerCrearItem)

	// 4. Servir el frontend
	http.Handle("/", http.FileServer(http.FS(distFS)))

	// --- LÓGICA DE AUTO-APERTURA AUTOMÁTICA ---
	url := "http://localhost:8088"
	go func() {
		// Esperamos 2 segundos para asegurar que el servidor levantó
		time.Sleep(2 * time.Second)

		var cmd *exec.Cmd
		if runtime.GOOS == "windows" {
			// Este comando es el más fiable en Windows para forzar la apertura
			cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
		} else if runtime.GOOS == "darwin" {
			cmd = exec.Command("open", url)
		} else {
			cmd = exec.Command("xdg-open", url)
		}
		
		if cmd != nil {
			log.Println("Abriendo navegador en:", url)
			cmd.Start()
		}
	}()

	// 5. Iniciar el servidor
	log.Println("Servidor iniciado en", url)
	if err := http.ListenAndServe(":8088", nil); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}
