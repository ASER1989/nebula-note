import {createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from "@client/types";
import {TemplateConfig} from "@client/models/template/types";

export type SliceType = {
  fetchStatus: FetchStatus;
  template: Partial<TemplateConfig> & {
    editStatus?: 'Edited' | 'Saved' | 'None'
  }
}

export const sliceName = "snippetList";
export const storeSlice = createSlice({
  name: sliceName,
  initialState: {
    fetchStatus: 'None',
    template: {} as SliceType['template'],
  },
  reducers: {
    setTemplateFilePath: (state, action: { payload: TemplateConfig }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...action.payload,
          editStatus: 'None'
        },
      };
    },
    setTemplateContent: (state, action: { payload: string }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          content: action.payload,
          editStatus: 'None'
        }
      };
    },
    setTemplateMeta: (state, action: { payload: string }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          meta: action.payload,
          editStatus: 'None'
        }
      };
    },
    updateTemplateContent: (state, action: { payload: string }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          content: action.payload,
          editStatus: 'Edited'
        }
      };
    },
    updateTemplateMeta: (state, action: { payload: string }) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          meta: action.payload,
          editStatus: 'Edited'
        }
      };
    },
    saveTemplateContent: (state) => {
      return {
        fetchStatus: 'None',
        template: {
          ...state.template,
          editStatus: 'Saved'
        }
      };
    },
  }
})

export const {
  setTemplateFilePath: setTemplateAction,
  setTemplateContent: setTemplateContentAction,
  setTemplateMeta: setTemplateMetaAction,
  updateTemplateContent: updateTemplateContentAction,
  updateTemplateMeta: updateTemplateMetaAction,
  saveTemplateContent: saveTemplateContentAction
} = storeSlice.actions;

export const reducer = storeSlice.reducer;
