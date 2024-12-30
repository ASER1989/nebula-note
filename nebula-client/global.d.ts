// global.d.ts
interface Window {
    NebulaShell?: {
        isMacos:boolean;
        isFullScreen:()=>Promise<boolean>;
        onFullScreen: (cb: Function) => void;
        onFullScreenLeave: (cb: Function) => void;
    };
}
