const { app, BrowserWindow, Menu, dialog, protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

function getMimeType(filePath) {
  const ext = path.join(filePath).split('.').pop().toLowerCase();
  switch (ext) {
    case 'html': return 'text/html; charset=utf-8';
    case 'js': return 'text/javascript; charset=utf-8';
    case 'css': return 'text/css; charset=utf-8';
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'gif': return 'image/gif';
    case 'svg': return 'image/svg+xml';
    case 'ico': return 'image/x-icon';
    case 'woff': return 'font/woff';
    case 'woff2': return 'font/woff2';
    case 'ttf': return 'font/ttf';
    case 'eot': return 'application/vnd.ms-fontobject';
    case 'json': return 'application/json; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

// Registrar el protocolo custom antes de que la app esté lista
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true
    }
  }
]);

let mainWindow;

// ─── Logger a archivo (solo en dev o si ocurre un error) ────────────────────
const logFile = path.join(app.getPath('userData'), 'edumath-crash.log');
const isDev = !app.isPackaged;
function log(msg) {
  if (isDev) console.log(msg);
  // Solo escribir al disco si hay un error real, no en cada evento
}
function logError(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try { fs.appendFileSync(logFile, line); } catch (_) {}
  console.error(msg);
}

// ─── Capturar errores no manejados ANTES de app.ready ───────────────────────
process.on('uncaughtException', (err) => {
  logError(`uncaughtException: ${err.message}\n${err.stack}`);
  if (app.isReady()) {
    try {
      dialog.showErrorBox('Error inesperado en EduMath', `${err.message}\n\nRevisa el log en:\n${logFile}`);
    } catch (_) {}
  }
  app.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logError(`unhandledRejection: ${reason}`);
});

// ─── Crear ventana principal ─────────────────────────────────────────────────
function createWindow() {
  const iconPath = path.join(__dirname, 'icono_app.ico');
  const iconExists = fs.existsSync(iconPath);
  const indexPath = path.join(__dirname, 'frontend', 'dist', 'index.html');

  if (!fs.existsSync(indexPath)) {
    logError('ERROR: index.html no encontrado en: ' + indexPath);
    dialog.showErrorBox(
      'Error al iniciar EduMath',
      `No se encontró el archivo de la aplicación.\n\nRuta esperada:\n${indexPath}\n\nPor favor, reinstala la aplicación.`
    );
    app.quit();
    return;
  }

  const windowOptions = {
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    // ✅ CLAVE: Mostrar ventana inmediatamente con fondo oscuro.
    // El usuario ve la ventana al instante en lugar de esperar en silencio.
    show: true,
    backgroundColor: '#0d1117',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  };

  if (iconExists) {
    windowOptions.icon = iconPath;
  }

  mainWindow = new BrowserWindow(windowOptions);

  // Maximizar antes de cargar para que el layout ya tenga las dimensiones correctas
  mainWindow.maximize();

  Menu.setApplicationMenu(null);

  // Capturar errores de carga de página
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    logError(`did-fail-load: code=${errorCode} desc=${errorDescription}`);
    dialog.showErrorBox(
      'Error al cargar EduMath',
      `La aplicación no pudo cargarse.\n\nCódigo: ${errorCode}\nDescripción: ${errorDescription}`
    );
  });

  mainWindow.loadURL('app://app/index.html').catch((err) => {
    logError(`loadURL ERROR: ${err.message}`);
    dialog.showErrorBox('Error al cargar EduMath', err.message);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─── Inicialización de la app ────────────────────────────────────────────────
// Optimización: desactivar GPU si no es necesario para acelerar el arranque
app.commandLine.appendSwitch('disable-features', 'HardwareMediaKeyHandling,MediaSessionService');
// Optimización: Reducir el tiempo de espera de la GPU
app.commandLine.appendSwitch('enable-features', 'ElasticOverscroll');

app.whenReady()
  .then(() => {
    log('app.whenReady resolved');

    // Registrar el handler para el protocolo custom 'app'
    try {
      protocol.handle('app', async (request) => {
        try {
          const reqUrl = new URL(request.url);
          let pathname = decodeURIComponent(reqUrl.pathname);
          log(`[Protocol app] Request: ${request.url} | Pathname: ${pathname}`);

          // Si el path es vacío o '/', redirigir a index.html
          if (pathname === '/' || pathname === '') {
            pathname = '/index.html';
          }

          const isVideo = pathname.startsWith('/videos/');

          if (isVideo) {
            // Los videos están en app.asar.unpacked (físicos en disco)
            const baseDir = app.isPackaged
              ? __dirname.replace(/app\.asar([\\/]|$)/i, 'app.asar.unpacked$1')
              : __dirname;
            const filePath = path.join(baseDir, 'frontend', 'dist', pathname);
            log(`[Protocol app] Video path: ${filePath}`);

            // Obtener tamaño del archivo para respuesta con rango
            let stat;
            try { stat = await fs.promises.stat(filePath); }
            catch (_) {
              logError(`Video no encontrado: ${filePath}`);
              return new Response('Video no encontrado', { status: 404 });
            }

            const fileSize = stat.size;
            const rangeHeader = request.headers.get('range');

            if (rangeHeader) {
              // Parsear "bytes=start-end"
              const [, startStr, endStr] = rangeHeader.match(/bytes=(\d*)-(\d*)/) || [];
              const start = startStr ? parseInt(startStr, 10) : 0;
              const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
              const chunkSize = end - start + 1;

              const stream = fs.createReadStream(filePath, { start, end });
              const nodeStream = new ReadableStream({
                start(controller) {
                  stream.on('data', chunk => {
                    try {
                      controller.enqueue(chunk);
                    } catch (err) {
                      stream.destroy();
                    }
                  });
                  stream.on('end', () => {
                    try {
                      controller.close();
                    } catch (_) {}
                  });
                  stream.on('error', err => {
                    try {
                      controller.error(err);
                    } catch (_) {}
                  });
                },
                cancel() {
                  stream.destroy();
                }
              });

              return new Response(nodeStream, {
                status: 206,
                headers: {
                  'content-type': 'video/mp4',
                  'content-range': `bytes ${start}-${end}/${fileSize}`,
                  'accept-ranges': 'bytes',
                  'content-length': String(chunkSize),
                }
              });
            } else {
              // Solicitud completa sin rango
              const stream = fs.createReadStream(filePath);
              const nodeStream = new ReadableStream({
                start(controller) {
                  stream.on('data', chunk => {
                    try {
                      controller.enqueue(chunk);
                    } catch (err) {
                      stream.destroy();
                    }
                  });
                  stream.on('end', () => {
                    try {
                      controller.close();
                    } catch (_) {}
                  });
                  stream.on('error', err => {
                    try {
                      controller.error(err);
                    } catch (_) {}
                  });
                },
                cancel() {
                  stream.destroy();
                }
              });

              return new Response(nodeStream, {
                status: 200,
                headers: {
                  'content-type': 'video/mp4',
                  'accept-ranges': 'bytes',
                  'content-length': String(fileSize),
                }
              });
            }
          } else {
            // Para otros recursos: leer del ASAR usando fs (compatible con archivos virtuales ASAR)
            const filePath = path.join(__dirname, 'frontend', 'dist', pathname);
            const data = await fs.promises.readFile(filePath);
            const contentType = getMimeType(filePath);
            log(`[Protocol app] File read from ASAR: ${filePath} | Mime: ${contentType}`);
            return new Response(data, {
              headers: { 'content-type': contentType }
            });
          }
        } catch (err) {
          logError(`Error en el handler del protocolo app: ${err.message}`);
          return new Response('Error interno del protocolo app', { status: 500 });
        }
      });
      log('Protocolo custom app:// registrado correctamente');
    } catch (err) {
      logError(`Error al registrar protocol.handle de app: ${err.message}`);
    }

    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((err) => {
    log(`app.whenReady ERROR: ${err.message}\n${err.stack}`);
    try {
      dialog.showErrorBox(
        'Error crítico de EduMath',
        `La aplicación no pudo iniciarse.\n\nError: ${err.message}\n\nLog: ${logFile}`
      );
    } catch (_) {}
    app.exit(1);
  });

app.on('window-all-closed', () => {
  log('window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
