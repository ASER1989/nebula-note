import React from 'react';
import Locale from "./modules/locale";
import SliceShop from "./modules/sliceShop";
import type {RouteObject} from "react-router-dom";
import _ from 'lodash';

type RouteConfig = RouteObject & { label: string };

const LOCALE: RouteConfig = {
  path: "/locale",
  label: "国际化",
  element: <Locale/>
}

const SLICE_SHOP: RouteConfig = {
  path: "/",
  element: <SliceShop/>,
  label: "编码辅助"
  // index:true,
}

export const Routings: Record<string, RouteConfig> = {
  LOCALE,
  SLICE_SHOP
}
const RoutingList: Array<RouteConfig> = _.values(Routings);
export default RoutingList;
