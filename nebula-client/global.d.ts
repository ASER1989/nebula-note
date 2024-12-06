// global.d.ts
/// <reference types="jest" />

declare interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}