export type Folder = {
    name: string;
    path: string;
    children: Array<Folder>;
    isExpanded?: boolean;
    isChecked?: boolean;
    isMatch?: boolean;
};
