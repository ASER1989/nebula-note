import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import * as server from '../../nebula-server/dist';
import IpcMessageIds from './ipc-message-ids';
import {queryIsMacOs} from "./queries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow: BrowserWindow | null = null;

const IS_MAC_OS = queryIsMacOs();

function startServer(): void {
    (app as any).server = server;
}

function createWindow(): void {
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

function handlesRegister(): void {
    ipcMain.handle(IpcMessageIds.window.IS_FULL_SCREEN, () => mainWindow?.isFullScreen());
}

function listenFullScreenState(): void {
    if (IS_MAC_OS) {
        mainWindow?.on('enter-full-screen', () => {
            mainWindow?.webContents.send(IpcMessageIds.window.ON_FULL_SCREEN_ENTER, true);
        });

        mainWindow?.on('leave-full-screen', () => {
            mainWindow?.webContents.send(IpcMessageIds.window.ON_FULL_SCREEN_LEAVE, true);
        });
    }
}

app.whenReady()
    .then(startServer)
    .then(createWindow)
    .then(handlesRegister)
    .then(listenFullScreenState)
    .then(() => {
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
