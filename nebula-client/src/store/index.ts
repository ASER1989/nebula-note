import {configureStore} from './configureStore';

export const store = configureStore();

declare global {
    interface Window {
        getState?: () => unknown;
    }
}

function onDev() {
    window.getState = () => store.getState();
}

onDev();
