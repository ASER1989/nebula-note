import { Permission } from '@client/models/permissions/type';
import { useRedux } from '@client/store/hooks/useRedux';

const REDUX_KEY = 'permissions';

// @ts-ignore
const IS_READONLY = import.meta.env.DEV ? false : false;
export const usePermissions = () => {
    const { state } = useRedux<Permission>(REDUX_KEY, {
        isReadonly: IS_READONLY ?? !window?.NebulaShell,
    });
    return state;
};
