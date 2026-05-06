package main

import (
    "encoding/json"
    "net/http"
)

type Item struct {
    ID      int    `json:"id"`
    Nombre  string `json:"nombre"`
    Detalle string `json:"detalle"`
    Fecha   string `json:"fecha"`
}

// GET /api/items → lista todos
func handlerItems(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT id, nombre, detalle, fecha FROM items ORDER BY id DESC")
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    defer rows.Close()

    var items []Item
    for rows.Next() {
        var i Item
        rows.Scan(&i.ID, &i.Nombre, &i.Detalle, &i.Fecha)
        items = append(items, i)
    }
    if items == nil {
        items = []Item{}
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(items)
}

// POST /api/items/crear → guarda uno nuevo
func handlerCrearItem(w http.ResponseWriter, r *http.Request) {
    var i Item
    json.NewDecoder(r.Body).Decode(&i)

    result, err := db.Exec("INSERT INTO items (nombre, detalle) VALUES (?, ?)", i.Nombre, i.Detalle)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    id, _ := result.LastInsertId()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]any{"ok": true, "id": id})
}
