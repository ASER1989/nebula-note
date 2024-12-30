const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const server = require('../service/index');
const os = require('os');

let mainWindow;

function initConfig() {
    global['is-mac-os'] = os.platform() === 'darwin';
}

function startServer() {
    app.server = server;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#213547',
            symbolColor: '#74b1be',
            height: 35,
        },
        icon: path.join(__dirname, 'assets/icon.ico'),
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3107/');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

function handlesRegister() {
    ipcMain.handle('get-is-mac-os', () => global['is-mac-os']);
    ipcMain.handle('get-is-full-screen', () => mainWindow.isFullScreen());
}

function listenFullScreenState() {
    if (global['is-mac-os']) {
        mainWindow.on('enter-full-screen', () => {
            mainWindow.webContents.send('enter-full-screen', true);
        });

        mainWindow.on('leave-full-screen', () => {
            mainWindow.webContents.send('leave-full-screen', true);
        });
    }
}

app.whenReady()
    .then(() => initConfig())
    .then(() => startServer())
    .then(() => createWindow())
    .then(() => handlesRegister())
    .then(() => listenFullScreenState())
    .then(() => {
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
