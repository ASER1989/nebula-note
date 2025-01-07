import { contextBridge, ipcRenderer } from 'electron';
import IpcMessageIds from './ipc-message-ids';

const isMacos = process.platform === 'darwin';

contextBridge.exposeInMainWorld('NebulaShell', {
    isMacos,
    isFullScreen: () => {
        return ipcRenderer.invoke(IpcMessageIds.window.IS_FULL_SCREEN);
    },
    on(id, callback) {
        ipcRenderer.on(id, callback);
    },
    onFullScreen(callback) {
        ipcRenderer.on(IpcMessageIds.window.ON_FULL_SCREEN_ENTER, callback);
    },
    onFullScreenLeave(callback) {
        ipcRenderer.on(IpcMessageIds.window.ON_FULL_SCREEN_LEAVE, callback);
    },
});
