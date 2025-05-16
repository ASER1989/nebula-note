import { Permission } from '@client/models/permissions/type';
import { useRedux } from '@client/store/hooks/useRedux';

const REDUX_KEY = 'permissions';
export const usePermissions = () => {
    const { state } = useRedux<Permission>(REDUX_KEY, {
        isReadonly: !window?.NebulaShell,
    });
    return state;
};
