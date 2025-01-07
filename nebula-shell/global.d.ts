//global.d.ts
import 'electron';
export {}

declare module 'electron' {
  interface App {
    server?: unknown;
  }
}
