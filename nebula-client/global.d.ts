// global.d.ts
interface Window {
    NebulaShell?: {
        isPro:boolean;
        isMacos:boolean;
        isFullScreen:()=>Promise<boolean>;
        onFullScreen: (cb: Function) => void;
        onFullScreenLeave: (cb: Function) => void;
        openDirectory: () => Promise<string>;
    };
}
