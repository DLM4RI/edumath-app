# 📚 OVA Matemáticas – Universidad de Córdoba

¡Bienvenido al equipo de desarrollo! 🚀  
Este proyecto combina un **potente motor en Go** (backend) con una **interfaz moderna en Vue 3 + Vuetify** (frontend).

Para que trabajemos en equipo sin errores ni dolores de cabeza 🧠💥, sigue estas instrucciones al pie de la letra.

---

## 🧭 Tabla de contenido

- [🛠️ Cómo empezar a editar (solo frontend)](#🛠️-cómo-empezar-a-editar-solo-frontend)
- [✅ Qué sí pueden tocar](#✅-qué-sí-pueden-tocar)
- [❌ Qué no deben tocar](#❌-qué-no-deben-tocar)
- [🔄 Ciclo de trabajo sugerido](#🔄-ciclo-de-trabajo-sugerido)
- [👤 Responsable de compilación](#👤-responsable-de-compilación)

---

## 🛠️ Cómo empezar a editar (solo frontend)

> ✨ **Ustedes trabajarán exclusivamente en la parte visual y pedagógica.**  
> No necesitan instalar Go ni configurar bases de datos.

### 📦 Guía rápida de comandos (copiar y pegar)

```bash
# 1. Clonar el proyecto y entrar a la carpeta
git clone https://github.com/TU_USUARIO/tu-repo.git
cd tu-repo/frontend

# 2. Instalar librerías necesarias (solo la primera vez)
#    Si no tienes pnpm, usa npm install
pnpm install

# 3. Correr el servidor de desarrollo
pnpm run dev
```

✅ Una vez ejecutado, abre el enlace que aparece en la terminal (normalmente `http://localhost:5173`) para ver tus cambios en tiempo real.

---

## ✅ Qué sí pueden tocar

Toda su magia debe ocurrir dentro de la carpeta `frontend/src/`:

| Carpeta / Archivo        | ¿Qué puedes hacer?                            |
| :----------------------- | :-------------------------------------------- |
| `src/pages/`             | Crear o editar lecciones de matemáticas       |
| `src/components/`        | Botones, tarjetas, menús y elementos visuales |
| `src/assets/`            | Imágenes, ilustraciones o archivos CSS        |
| `src/plugins/vuetify.js` | Cambiar colores globales o el tema de la app  |

### 📝 Ejemplos de lo que SÍ puedes modificar:

- ✅ Agregar nuevas lecciones o ejercicios matemáticos
- ✅ Cambiar colores, fuentes o estilos visuales
- ✅ Insertar imágenes, diagramas o ilustraciones
- ✅ Crear nuevos componentes (botones, tarjetas, menús)
- ✅ Modificar el diseño y la disposición de los elementos en pantalla
- ✅ Agregar animaciones o transiciones suaves
- ✅ Mejorar la experiencia de usuario (UX)

---

## ❌ Qué no deben tocar (¡peligro!)

⚠️ **Zona prohibida** – Modificar estos archivos puede romper todo el sistema.

### Archivos y carpetas que NO deben modificarse:

| Archivo/Carpeta                | ¿Por qué está prohibido?                                     |
| :----------------------------- | :----------------------------------------------------------- |
| `*.go` (todos los archivos Go) | El backend en Go maneja la lógica del servidor               |
| `main.go`                      | Punto de entrada del servidor                                |
| `database.go`                  | Gestiona la conexión a la base de datos                      |
| `handlers.go`                  | Maneja las peticiones del servidor                           |
| `go.mod` / `go.sum`            | Configuración de dependencias de Go                          |
| `package-lock.json`            | Bloqueo de versiones de librerías                            |
| `database.db`                  | Base de datos local (además, NO debe subirse al repositorio) |
| `frontend/dist/`               | Carpeta generada automáticamente al compilar                 |

### 🚫 Comportamientos prohibidos:

- ❌ Modificar cualquier archivo con extensión `.go`
- ❌ Editar archivos de configuración de dependencias
- ❌ Subir el archivo `database.db` al repositorio
- ❌ Editar manualmente la carpeta `frontend/dist/`
- ❌ Modificar el `package.json` sin autorización
- ❌ Cambiar la estructura de carpetas principal

⚠️ **Consecuencias de violar estas reglas:**

- El programa dejará de compilar
- El servidor no arrancará
- Puedes generar conflictos difíciles de resolver
- Retrasarás la entrega final del proyecto

---

## 🔄 Ciclo de trabajo sugerido

Para evitar conflictos de código, sigue este orden cada vez que trabajes:

**1️⃣ Sincronizar (antes de empezar)**

```bash
git pull origin main
```

**2️⃣ Trabajar**
Haz tus cambios y verifica que todo se vea bien en el navegador.

**3️⃣ Subir cambios (al terminar)**

```bash
git add .
git commit -m "Explica qué cambiaste (ej: Corregida fórmula en Lección 2)"
git push origin main
```

### 📌 Buenas prácticas para commits:

- ✅ Usa mensajes claros y descriptivos
- ✅ Ejemplo: `"Agregada animación en el botón de inicio"`
- ✅ Ejemplo: `"Corregido error tipográfico en la Lección 3"`
- ✅ Ejemplo: `"Mejorada la paleta de colores en el menú principal"`
- ❌ Evita mensajes como: `"cambios"` o `"fix"`

---

## 👤 Responsable de compilación

🧠 La generación de los archivos ejecutables (`.exe`) para Windows es responsabilidad exclusiva de **Mario Castro (Viper)**.

### Flujo de trabajo con el responsable:

1.  Tú haces tus cambios en el frontend
2.  Subes los cambios a GitHub
3.  Mario Castro (Viper) revisa y compila la versión final
4.  Él genera el archivo `.exe` para Windows
5.  Se entrega la versión final del proyecto

> **No intentes compilar tú mismo el archivo final** – esa tarea está asignada exclusivamente a Mario.

---

## 🆘 ¿Necesitas ayuda?

### Problemas comunes y soluciones:

| Problema                      | Posible solución                                                       |
| :---------------------------- | :--------------------------------------------------------------------- |
| `pnpm`: comando no encontrado | Instala pnpm con `npm install -g pnpm` o usa `npm install` en su lugar |
| El servidor no arranca        | Verifica que estás en la carpeta `frontend/`                           |
| Los cambios no se ven         | Refresca la página (F5) o reinicia el servidor                         |
| Conflictos al hacer push      | Haz `git pull origin main` primero y resuelve conflictos               |
| Error de compilación          | Revisa que no hayas modificado archivos prohibidos                     |

### Contacto:

- 📧 **Mario Castro (Viper)** – Responsable de compilación
- 💬 **Grupo del equipo** – Para dudas rápidas
- 📝 **Issues de GitHub** – Para reportar problemas

---

## 📋 Resumen rápido

| ¿Qué hacer?                           | ¿Qué no hacer?                            |
| :------------------------------------ | :---------------------------------------- |
| ✅ Editar `src/pages/`                | ❌ Tocar archivos `.go`                   |
| ✅ Modificar `src/components/`        | ❌ Editar `database.db`                   |
| ✅ Cambiar `src/assets/`              | ❌ Modificar `frontend/dist/`             |
| ✅ Ajustar `vuetify.js`               | ❌ Cambiar `go.mod` o `package-lock.json` |
| ✅ Hacer `git pull` antes de empezar  | ❌ Subir archivos prohibidos              |
| ✅ Escribir mensajes de commit claros | ❌ Compilar el `.exe` por tu cuenta       |

---

## 🎯 ¡Manos a la obra!

1.  Clona el repositorio
2.  Instala las dependencias
3.  Corre el servidor de desarrollo
4.  ¡Empieza a crear contenido matemático increíble!
