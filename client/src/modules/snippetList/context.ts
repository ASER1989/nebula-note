import { createContext } from 'react';

interface ContextType {
    setKeyword: (keyword: string | undefined) => void;
    createSnippet: () => void;
    keyword: string | undefined;
}

const defaultValue = {
    setKeyword: () => {},
    createSnippet: () => {},
    keyword: undefined,
};

export const SnippetListContext = createContext<ContextType>(defaultValue);
