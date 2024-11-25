import { createContext } from 'react';

interface ContextType {
    setKeyword: (keyword: string | undefined) => void;
    keyword: string | undefined;
}

const defaultValue= {
    setKeyword: () => {},
    keyword: undefined,
};

export const SnippetListContext = createContext<ContextType>(defaultValue);
