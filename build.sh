#!/bin/bash
set -e

# Configuración de rutas y nombres
APP_NAME="OVA_Matematicas.exe"
APK_NAME="OVA_Matematicas.apk"
OUTPUT_DIR="dist_final"

# USAR EL JDK DE ANDROID STUDIO (Esto soluciona los errores de compilación)
AS_JDK="/home/viperlightt/Descargas/programs/android-studio-panda4-patch1-linux/android-studio/jbr"

if [ -d "$AS_JDK" ]; then
    export JAVA_HOME="$AS_JDK"
    export PATH="$JAVA_HOME/bin:$PATH"
    echo "☕ Usando JDK de Android Studio: $JAVA_HOME"
else
    echo "⚠️ No se encontró el JDK de Android Studio en la ruta esperada."
    echo "Intentando usar el Java del sistema..."
fi

echo "🚀 Iniciando construcción automática Multiplataforma..."

# 0. Limpieza
mkdir -p "$OUTPUT_DIR"

# 1. Multimedia
echo "📁 1/5: Sincronizando multimedia..."
mkdir -p frontend/public/img frontend/public/videos
cp -ru img/* frontend/public/img/ 2>/dev/null || true
cp -ru videos/* frontend/public/videos/ 2>/dev/null || true

# 2. Frontend
echo "📦 2/5: Compilando interfaz web..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install --no-audit --no-fund
fi
npm run build
cd ..

# 3. Windows Resources
echo "🎨 3/5: Preparando recursos de Windows..."
if ! command -v rsrc &> /dev/null; then
    go install github.com/akavel/rsrc@latest
    export PATH=$PATH:$(go env GOPATH)/bin
fi
rsrc -arch amd64 -ico "icono_app.ico" -o recursos.syso 2>/dev/null || true

# 4. Compilar EXE
echo "🪟 4/5: Generando ejecutable Windows..."
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 \
  go build -ldflags="-s -w -H=windowsgui" -o "$OUTPUT_DIR/$APP_NAME" .
rm -f recursos.syso

# 5. Generar APK
echo "🤖 5/5: Generando APK de Android..."
cd frontend
npx cap sync android > /dev/null
cd android
chmod +x gradlew
./gradlew assembleDebug -x test

# Mover resultado final
cp app/build/outputs/apk/debug/app-debug.apk "../../$OUTPUT_DIR/$APK_NAME"
cd ../..

echo ""
echo "=========================================================="
echo "✅ ¡TODO LISTO Y COMPILADO!"
echo "=========================================================="
echo "📍 LOS ARCHIVOS ESTÁN EN: $OUTPUT_DIR/"
echo "🪟 Versión Windows: $OUTPUT_DIR/$APP_NAME"
echo "🤖 Versión Celular: $OUTPUT_DIR/$APK_NAME"
echo "=========================================================="