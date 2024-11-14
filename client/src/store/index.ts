import { store } from './store';
export type { RootState } from './store';
export { store } from './store';
export { useSelector, useDispatch } from 'react-redux';

declare global {
  interface Window {
    getState?: () => unknown;
  }
}
function onDev(){

  window.getState =()=> store.getState();
}
onDev();

