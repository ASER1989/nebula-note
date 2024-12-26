// global.d.ts

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PLATFORM?: string; // 可选的环境变量，默认为 string 或 undefined
        }
    }
    type process = {
        env: {
            PLATFORM?: string;
        };
    };
}

export {};
