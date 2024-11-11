export type TemplateRecord = {
    document: string;
    filePath: string;
    keyword: string;
    name: string;
    version: number;
};

export type TemplateConfig = Partial<TemplateRecord> & {
    content?: string;
    meta?: string;
};
