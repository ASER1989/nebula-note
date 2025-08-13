/// <reference types="koa" />
/// <reference types="formidable" />

namespace Note {
    export type TemplateRecord = {
        title: string;
        language?: string;
        content?: string;
    };
    export type NoteRecord = {
        filePath: string;
        keyword?: string;
        name: string;
        version?: number;
        document?: string;
        meta?: string;
        templateList?: Array<TemplateRecord>;
    };

    export type NoteRecordReq = NoteRecord & {
        replace?: boolean;
    };

    export type NoteImageUploadReq = NoteRecord & {
        file: File;
    };
}
namespace System {
    export type Settings = {
        lang: string;
        servicePort: number;
        autoSave: boolean;
        dataSource: Array<{
            path: string;
            isActive: boolean;
        }>;
    };
}

namespace global {
    export type MultipartContext = Koa.Context & {
        request: Koa.Request & { files?: formidable.Files<string> };
    };
}
