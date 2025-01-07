import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import * as server from '../nebula-server/dist';
import os from 'os';
import IpcMessageIds from "./ipc-message-ids";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
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
    mainWindow.loadURL('http://localhost:3816/');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

function handlesRegister() {
    ipcMain.handle(IpcMessageIds.window.IS_FULL_SCREEN, () => mainWindow.isFullScreen());
}

function listenFullScreenState() {
    if (global['is-mac-os']) {
        mainWindow.on('enter-full-screen', () => {
            mainWindow.webContents.send(IpcMessageIds.window.ON_FULL_SCREEN_ENTER, true);
        });

        mainWindow.on('leave-full-screen', () => {
            mainWindow.webContents.send(IpcMessageIds.window.ON_FULL_SCREEN_LEAVE, true);
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
