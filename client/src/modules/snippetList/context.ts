import { createContext } from 'react';

interface ContextType {
    createSnippet: () => void;
}

const defaultValue = {
    createSnippet: () => {},
};

export const SnippetListContext = createContext<ContextType>(defaultValue);
