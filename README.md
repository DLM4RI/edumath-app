## 📚 OVA Matemáticas - Universidad de Córdoba

¡Bienvenidos al equipo de desarrollo! Este proyecto combina un motor de
Go (Backend) con una interfaz moderna en Vue 3 + Vuetify (Frontend).

Para que todos trabajemos en sintonía y evitemos errores en la
compilación final, sigan estas instrucciones paso a paso.

------------------------------------------------------------------------

## 🛠️ Cómo empezar a editar (solo frontend)

Ustedes trabajarán exclusivamente en la parte visual y pedagógica. No
necesitan instalar Go ni configurar bases de datos.

## Guía rápida de comandos (copiar y pegar)

Si ya aceptaste la invitación de colaborador en GitHub, abre tu terminal
y ejecuta:

1. Clonar el proyecto y entrar a la carpeta

    ```git clone https://github.com/TU_USUARIO/tu-repo.git```
    ```cd tu-repo/frontend```

2. Instalar las librerías necesarias (solo la primera vez)

Si no tienes pnpm, puedes usar npm install.

    ```pnpm install```

3. Correr el servidor de desarrollo

    ```pnpm run dev```

Abre el enlace que aparecerá en la terminal (normalmente
http://localhost:5173) para ver tus cambios en tiempo real.

------------------------------------------------------------------------

✅ Qué sí pueden tocar

Toda su magia debe ocurrir dentro de la carpeta frontend/src/:

-   src/pages/: para crear o editar el contenido de las lecciones de
    matemáticas.
-   src/components/: para botones, tarjetas, menús y elementos visuales.
-   src/assets/: para imágenes, ilustraciones o archivos CSS.
-   src/plugins/vuetify.js: para cambiar colores globales o el tema de
    la aplicación.

------------------------------------------------------------------------

❌ Qué no deben tocar (¡peligro!)

Por seguridad del sistema y para evitar que el programa deje de
funcionar, está prohibido modificar:

-   Archivos .go en la raíz (main.go, database.go, handlers.go).
-   Configuración de dependencias (go.mod, go.sum, package-lock.json).
-   El archivo database.db: es la base de datos local y no debe subirse.
-   La carpeta frontend/dist/: se genera automáticamente y no debe
    editarse a mano.

------------------------------------------------------------------------

🔄 Ciclo de trabajo sugerido

Para evitar conflictos de código, sigan siempre este orden cada vez que
vayan a trabajar.

1. Sincronizar (antes de empezar)

    ```git pull origin main```

2. Trabajar

Hagan sus cambios y verifiquen que todo se vea bien en el navegador.

3. Subir cambios (al terminar)

    ```git add .```
    ```git commit -m "Explica qué cambiaste (ej: Corregida fórmula en Lección 2)"```
    ```git push origin main```

------------------------------------------------------------------------

👤 Responsable de compilación

La generación de los archivos ejecutables (.exe) para Windows es
responsabilidad exclusiva de Mario Castro (Viper).

Una vez que sus cambios estén en GitHub, él se encargará de generar la
versión final para la entrega.
