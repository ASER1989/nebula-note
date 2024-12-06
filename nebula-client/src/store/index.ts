import { store } from './store';

export type { RootState } from './store';
export { store } from './store';

declare global {
    interface Window {
        getState?: () => unknown;
    }
}

function onDev() {
    window.getState = () => store.getState();
}

onDev();
