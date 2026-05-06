#!/bin/bash
set -e

echo "📦 Construyendo frontend..."
cd frontend
npm run build
cd ..

echo "🐧 Compilando para Linux..."
go build -o bin/mi-app-linux .

echo "🪟  Compilando para Windows..."
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 \
  go build -ldflags="-s -w" -o mi-app-backend.exe .

echo ""
echo "✅ Listo!"
echo "   bin/mi-app-linux"
echo "   bin/mi-app.exe  ← copia al USB"
