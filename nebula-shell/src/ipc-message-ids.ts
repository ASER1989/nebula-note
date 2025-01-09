/**
 * A list of the different message ID's that can be sent between web and the shell
 */
export default {
    fromShell:{
        ON_FULL_SCREEN_ENTER: 'from-shell/event/enter-full-screen',
        ON_FULL_SCREEN_LEAVE: 'from-shell/event/leave-full-screen',
    },
    toShell:{
        IS_FULL_SCREEN: 'to-shell/state/is-full-screen',
        OPEN_DIRECTORY: 'to-shell/action/open-directory'
    }
};
