#!/bin/bash
set -e

# Configuración de nombres
APP_NAME="OVA_Matematicas.exe"
ICON_FILE="icono_app.ico"
OUTPUT_DIR="bin"

echo "🚀 Iniciando construcción del OVA Matemáticas..."

# 1. Construir el Frontend (Vue 3 + Vuetify)
echo "📦 1/3: Compilando interfaz gráfica..."
cd frontend
npm install
npm run build
cd ..

# 2. Preparar el Icono y Recursos de Windows
echo "🎨 2/3: Inyectando icono $ICON_FILE..."
# Instalamos rsrc si no existe
if ! command -v rsrc &> /dev/null; then
    echo "Instalando herramienta de recursos..."
    go install github.com/akavel/rsrc@latest
    export PATH=$PATH:$(go env GOPATH)/bin
fi

# Generamos el archivo de objetos de Windows
rsrc -arch amd64 -ico "$ICON_FILE" -o recursos.syso

# 3. Compilar el ejecutable final
echo "🪟 3/3: Generando ejecutable de Windows (Modo GUI)..."
# CGO_ENABLED=0 para que sea estático y funcione en cualquier PC
# -H=windowsgui para que no abra la ventana negra del CMD
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 \
  go build -ldflags="-s -w -H=windowsgui" -o "$APP_NAME" .

# Limpieza de archivos temporales
rm -f recursos.syso


echo ""
echo "=========================================================="
echo "✅ ¡TERMINADO EXITOSAMENTE!"
echo "=========================================================="
echo "📍 Archivo: $APP_NAME"
echo "🖼️  Icono: Inyectado correctamente."
echo "🎥 Videos: El sistema buscará en la carpeta ./videos"
echo "=========================================================="