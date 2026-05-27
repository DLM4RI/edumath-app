#!/bin/bash

# =====================================================
# BUILD SCRIPT - OVA Matemáticas (Electron + Android)
# =====================================================

# Configuración de rutas y nombres
APP_NAME_WIN="OVA_Matematicas.exe"
APP_NAME_LINUX="OVA_Matematicas.AppImage"
APK_NAME="OVA_Matematicas.apk"
OUTPUT_DIR="dist_final"

# ---- Firma de código DESACTIVADA (unset = sin certificado) ----
# IMPORTANTE: exportar como string vacío "" hace que electron-builder
# resuelva el CWD como certificado → crash. Hay que usar unset.
unset WIN_CSC_LINK
unset WIN_CSC_KEY_PASSWORD
unset CSC_LINK
unset CSC_KEY_PASSWORD
export CSC_IDENTITY_AUTO_DISCOVERY=false
export WINEARCH=win64

# ---- JDK de Android Studio (solo necesario para APK) ----
AS_JDK="/home/viperlightt/Descargas/programs/android-studio-panda4-patch1-linux/android-studio/jbr"
if [ -d "$AS_JDK" ]; then
    export JAVA_HOME="$AS_JDK"
    export PATH="$JAVA_HOME/bin:$PATH"
    echo "☕ Usando JDK de Android Studio: $JAVA_HOME"
else
    echo "⚠️  No se encontró el JDK de Android Studio, usando Java del sistema."
fi

echo ""
echo "=========================================================="
echo "🚀 Iniciando BUILD - EduMath MateCord OVA"
echo "=========================================================="

# --- LIMPIEZA ---
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# ================================================
# PASO 1: Compilar el Frontend (Vue/Vite)
# ================================================
echo ""
echo "📦 [1/4] Compilando frontend (Vue + Vite)..."
npm install --no-fund --no-audit 2>&1 | tail -3
npm run frontend:install 2>&1 | tail -3
NODE_OPTIONS='--max-old-space-size=3072' npm run frontend:build

if [ ! -f "frontend/dist/index.html" ]; then
    echo "❌ ERROR: El frontend no compiló. Revisa los errores arriba."
    exit 1
fi
echo "✅ Frontend compilado OK."

# Liberar RAM entre pasos
echo "   ⏳ Liberando RAM (10s)..."
sleep 10

# ================================================
# PASO 2: Generar EXE para Windows
# ================================================
echo ""
echo "🪟  [2/4] Generando .exe para Windows (Instalador NSIS x64)..."

rm -rf dist_desktop

env -u WIN_CSC_LINK -u CSC_LINK -u WIN_CSC_KEY_PASSWORD -u CSC_KEY_PASSWORD \
  CSC_IDENTITY_AUTO_DISCOVERY=false \
  WINEARCH=win64 \
  NODE_OPTIONS='--max-old-space-size=3072' \
  npx electron-builder --win --x64 2>&1

WIN_FOUND=false
# Buscar el instalador NSIS
INSTALLER_FILE=$(find dist_desktop -maxdepth 1 -name "*.exe" 2>/dev/null | head -1)

if [ -n "$INSTALLER_FILE" ]; then
    echo "   📁 Copiando Instalador: $INSTALLER_FILE → $OUTPUT_DIR/OVA_Matematicas_Instalador.exe"
    cp "$INSTALLER_FILE" "$OUTPUT_DIR/OVA_Matematicas_Instalador.exe"
    WIN_FOUND=true
    SIZE_INS=$(du -sh "$OUTPUT_DIR/OVA_Matematicas_Instalador.exe" | cut -f1)
    echo "✅ Windows Instalador generado: $OUTPUT_DIR/OVA_Matematicas_Instalador.exe ($SIZE_INS)"
else
    echo "⚠️  No se encontró ningún instalador .exe."
    ls -lh dist_desktop/ 2>/dev/null || echo "   (carpeta dist_desktop vacía)"
fi

# Liberar RAM entre pasos
echo "   ⏳ Liberando RAM (10s)..."
sleep 10

# ================================================
# PASO 3: Generar AppImage para Linux
# ================================================
echo ""
echo "🐧 [3/4] Generando AppImage para Linux..."

NODE_OPTIONS='--max-old-space-size=3072' \
npx electron-builder --linux 2>&1

LINUX_FOUND=false
APPIMAGE_FILE=$(find dist_desktop -maxdepth 1 -name "*.AppImage" 2>/dev/null | head -1)
if [ -n "$APPIMAGE_FILE" ]; then
    cp "$APPIMAGE_FILE" "$OUTPUT_DIR/$APP_NAME_LINUX"
    chmod +x "$OUTPUT_DIR/$APP_NAME_LINUX"
    LINUX_FOUND=true
    SIZE=$(du -sh "$OUTPUT_DIR/$APP_NAME_LINUX" | cut -f1)
    echo "✅ Linux AppImage generado: $OUTPUT_DIR/$APP_NAME_LINUX ($SIZE)"
else
    echo "⚠️  No se encontró AppImage."
fi

# ================================================
# PASO 4: Generar APK de Android (Capacitor)
# ================================================
echo ""
echo "🤖 [4/4] Generando APK de Android..."

APK_FOUND=false
if [ -d "frontend/android" ]; then
    cd frontend
    npx cap sync android 2>&1 | grep -v "^$" | tail -5
    cd android
    chmod +x gradlew
    if ./gradlew assembleDebug -x test 2>&1 | tail -10; then
        APK_FILE=$(find app/build/outputs/apk -name "*.apk" 2>/dev/null | head -1)
        if [ -n "$APK_FILE" ]; then
            cp "$APK_FILE" "../../$OUTPUT_DIR/$APK_NAME"
            APK_FOUND=true
            echo "✅ APK generado: $OUTPUT_DIR/$APK_NAME"
        fi
    else
        echo "⚠️  APK falló. Compila manualmente desde Android Studio."
    fi
    cd ../..
else
    echo "⚠️  No se encontró android/. APK no generado."
fi

# ================================================
# RESUMEN FINAL
# ================================================
echo ""
echo "=========================================================="
echo "📋 RESUMEN DEL BUILD"
echo "=========================================================="
if [ -f "$OUTPUT_DIR/OVA_Matematicas_Instalador.exe" ]; then
    echo "  🪟 Win Instalador: $OUTPUT_DIR/OVA_Matematicas_Instalador.exe  ✅"
else
    echo "  🪟 Win Instalador: ❌ No generado"
fi
if $LINUX_FOUND; then
    echo "  🐧 Linux AppImage: $OUTPUT_DIR/$APP_NAME_LINUX  ✅"
else
    echo "  🐧 Linux AppImage: ❌ No generado"
fi
if $APK_FOUND; then
    echo "  🤖 Android APK:   $OUTPUT_DIR/$APK_NAME  ✅"
else
    echo "  🤖 Android APK:   ❌ No generado (usa Android Studio)"
fi
echo "=========================================================="
echo ""
echo "📂 Archivos en $OUTPUT_DIR/:"
ls -lh "$OUTPUT_DIR/" 2>/dev/null
echo ""

if $WIN_FOUND || $LINUX_FOUND; then
    echo "✅ ¡Build completado! Revisa la carpeta $OUTPUT_DIR/"
    exit 0
else
    echo "❌ No se generó ningún ejecutable. Revisa los errores arriba."
    exit 1
fi