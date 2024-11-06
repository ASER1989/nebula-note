import {useEffect} from "react";
import {store, useSelector, useDispatch} from "@client/store";
import {Action, Reducer} from "@reduxjs/toolkit";

type Props<T> = {
  key: string,
  reducer: Reducer<T, Action>
}
export const useReduxSlice = <SliceType>({key, reducer}: Props<SliceType>) => {
  useEffect(() => {
    store.reducerManager.add(key, reducer);
  }, []);

  const state = useSelector((storeState: Record<string, SliceType>) => {
    return storeState?.[key];
  });
  return [state, useDispatch()] as const;
}
