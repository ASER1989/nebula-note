import { contextBridge, ipcRenderer } from 'electron';
import IpcMessageIds from './ipc-message-ids';
import { queryIsMacOs } from './queries';

const isMacos = queryIsMacOs();

contextBridge.exposeInMainWorld('NebulaShell', {
    isPro: true,
    isMacos,
    isFullScreen: (): Promise<boolean> => {
        return ipcRenderer.invoke(IpcMessageIds.toShell.IS_FULL_SCREEN);
    },
    on: (
        id: string,
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
    ) => {
        ipcRenderer.on(id, callback);
    },
    onFullScreen: (
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
    ) => {
        ipcRenderer.on(IpcMessageIds.fromShell.ON_FULL_SCREEN_ENTER, callback);
    },
    onFullScreenLeave: (
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
    ) => {
        ipcRenderer.on(IpcMessageIds.fromShell.ON_FULL_SCREEN_LEAVE, callback);
    },
    openDirectory: (): Promise<string> => {
        return ipcRenderer.invoke(IpcMessageIds.toShell.OPEN_DIRECTORY);
    },
});
