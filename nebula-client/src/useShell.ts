import React, { useEffect, useMemo, useState } from 'react';

export const useShell = () => {
    const [isMacos, setIsMacos] = useState(false);
    const [isMacosFullScreen, setIsMacosFullScreen] = useState(false);
    const layoutCssVariables = useMemo<React.CSSProperties>(() => {
        const appHeadLeftPaddingDefault = '5px';
        const appHeadLeftPadding = isMacos ? '76px' : appHeadLeftPaddingDefault;
        return {
            '--app-head-left-padding': isMacosFullScreen
                ? appHeadLeftPaddingDefault
                : appHeadLeftPadding,
        } as React.CSSProperties;
    }, [isMacosFullScreen, isMacos]);
    useEffect(() => {
        if (window.NebulaShell) {
            setIsMacos(window.NebulaShell.isMacos);
            window.NebulaShell.isFullScreen().then((isFullScreen) => {
                setIsMacosFullScreen(
                    isFullScreen && (window.NebulaShell?.isMacos ?? false),
                );
            });

            window.NebulaShell.onFullScreen(() => {
                setIsMacosFullScreen(true);
            });
            window.NebulaShell.onFullScreenLeave(() => {
                setIsMacosFullScreen(false);
            });
        }
    }, []);

    return {
        layoutCssVariables,
    };
};
