import React from 'react';
import NoteList from './modules/noteList';

import type { RouteObject } from 'react-router-dom';
import _ from 'lodash';

type RouteConfig = RouteObject & { label: string };

const NOTE_LIST: RouteConfig = {
    path: '/:navigateNoteName?',
    element: <NoteList />,
    label: '首页',
};

export const Routes: Record<string, RouteConfig> = {
    NOTE_LIST,
};
const RouteList: Array<RouteConfig> = _.values(Routes);
export default RouteList;
