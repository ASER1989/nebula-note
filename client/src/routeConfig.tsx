import React from 'react';
import NoteList from './modules/noteList';

import type { RouteObject } from 'react-router-dom';
import _ from 'lodash';

type RouteConfig = RouteObject & { label: string };


const NOTE_LIST: RouteConfig = {
    path: '/:name',
    element: <NoteList />,
    label: '首页',
};

export const Routings: Record<string, RouteConfig> = {
    NOTE_LIST,
};
const RoutingList: Array<RouteConfig> = _.values(Routings);
export default RoutingList;
