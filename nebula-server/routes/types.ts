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
