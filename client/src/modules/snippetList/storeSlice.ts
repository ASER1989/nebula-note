import {createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from "@client/types";
import {TemplateConfig} from "@client/models/template/types";

export type SliceType = {
  fetchStatus: FetchStatus;
  template: Partial<TemplateConfig> & {
    content?: string;
  }
}

export const sliceName = "snippetList";
export const storeSlice = createSlice({
  name: sliceName,
  initialState: {
    fetchStatus: 'None',
    template: {} as SliceType['template']
  },
  reducers: {
    setTemplateFilePath: (state, action: { payload: TemplateConfig }) => {
      return {
        fetchStatus: 'None',
        template: action.payload
      };
    },
    setTemplateContent: (state, action: { payload: string }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          content: action.payload
        }
      };
    },
  }
})

export const {
  setTemplateFilePath: setTemplateAction,
  setTemplateContent: setTemplateContentAction
} = storeSlice.actions;

export const reducer = storeSlice.reducer;
