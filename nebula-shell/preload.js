/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
import { ipcRenderer } from 'electron';

window.NebulaShell = {
    isMacos: false,
    isFullScreen:()=>{
        return ipcRenderer.invoke('get-is-full-screen');
    },
    on(id, callback) {
        ipcRenderer.on(id, callback);
    },
    onFullScreen(callback) {
        ipcRenderer.on('enter-full-screen', callback);
    },
    onFullScreenLeave(callback) {
        ipcRenderer.on('leave-full-screen', callback);
    },
};

(async () => {
    window.NebulaShell.isMacos = await ipcRenderer.invoke('get-is-mac-os');
})();

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});
