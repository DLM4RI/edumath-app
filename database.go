package main

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"
)

var db *sql.DB

func iniciarDB() {
	// Guardar el archivo en la carpeta del ejecutable
	exePath, _ := os.Executable()
	dbPath := filepath.Join(filepath.Dir(exePath), "data", "app.db")

	// Crear carpeta data si no existe
	os.MkdirAll(filepath.Dir(dbPath), 0755)

	var err error
	db, err = sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatal("Error abriendo DB:", err)
	}

	// Crear tabla si no existe
	db.Exec(`CREATE TABLE IF NOT EXISTS items (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre  TEXT NOT NULL,
        detalle TEXT,
        fecha   DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)

	log.Println("Base de datos lista en:", dbPath)
}
