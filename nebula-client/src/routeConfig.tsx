import React from 'react';
import _ from 'lodash';
import type { RouteObject } from 'react-router-dom';
import NoteList from './modules/noteList';

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
