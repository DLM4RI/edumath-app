# Guía de Desarrollo — OVA Matemáticas (Electron + Android)

La plataforma es 100% independiente (sin servidor). El frontend Vue/Vite se compila en archivos
estáticos que quedan empaquetados dentro del ejecutable de escritorio y el APK móvil.

---

## ✏️ ¿Cómo hacer cambios en el código?

Todos los archivos a editar están en `frontend/src/`:

- **Código y pantallas:** Edita archivos `.vue` en `frontend/src/components/...`
- **Imágenes o videos:** Copia los archivos a `frontend/public/img/` o `frontend/public/videos/`
  - ⚠️ **Importante:** Al referenciarlos en el código usa rutas **sin `/` al inicio**:
    ```html
    <!-- ✅ Correcto -->
    <img src="img/mi-imagen.png" />

    <!-- ❌ Incorrecto — no funciona en el .exe de Windows -->
    <img src="/img/mi-imagen.png" />
    ```

---

## 🔍 ¿Cómo probar mientras edito? (modo desarrollo)

```bash
cd frontend
npm run dev
```

Abre el proyecto en el navegador con recarga automática al guardar cambios.

---

## 🚀 ¿Cómo generar el ejecutable para Windows + Linux + APK?

Desde la **raíz del proyecto**, ejecuta:

```bash
./build.sh
```

El script hace todo automáticamente:
1. Compila el frontend (Vue → archivos estáticos en `frontend/dist/`)
2. Empaqueta Electron → `.exe` portable para Windows
3. Empaqueta Electron → `.AppImage` para Linux
4. Compila con Gradle → `.apk` para Android

**Resultado en `dist_final/`:**
| Archivo | Plataforma |
|---------|-----------|
| `OVA_Matematicas.exe` | 🪟 Windows (portable, no requiere instalación) |
| `OVA_Matematicas.AppImage` | 🐧 Linux |
| `OVA_Matematicas.apk` | 🤖 Android |

---

## ⚙️ Solo generar el .exe (más rápido)

Si solo necesitas el ejecutable de Windows sin compilar el APK:

```bash
# Primero compilar el frontend
npm run frontend:build

# Luego solo el exe
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist:win
```

El `.exe` queda en `dist_desktop/EduMath MateCord 1.0.0.exe`.

---

## ❓ Solución de errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `wine is required` | Firma de código activa | Ya corregido — el build usa `CSC_IDENTITY_AUTO_DISCOVERY=false` |
| `wine: could not load kernel32.dll` | Wine prefix no inicializado o arquitectura incorrecta | Ejecutar: `rm -rf ~/.wine && WINEARCH=win64 wineboot --init` |
| `wine32 is missing` | rcedit intenta usar exe de 32 bits | Ya corregido — `signAndEditExecutable: false` en package.json |
| Imágenes no cargan en Windows | Ruta con `/` al inicio | Usa `src="img/..."` sin la `/` |
| APK no se genera | Android Studio/SDK no configurado | Abre Android Studio y usa `Build > Generate APK` |
