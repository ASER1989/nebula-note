import React from 'react';
import SnippetList from './modules/snippetList';

import type { RouteObject } from 'react-router-dom';
import _ from 'lodash';

type RouteConfig = RouteObject & { label: string };


const SNIPPET_LIST: RouteConfig = {
    path: '/',
    element: <SnippetList />,
    label: '片段管理',
};

export const Routings: Record<string, RouteConfig> = {
    SNIPPET_LIST,
};
const RoutingList: Array<RouteConfig> = _.values(Routings);
export default RoutingList;
