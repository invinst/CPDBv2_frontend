import React from 'react';
import { noop } from 'lodash';


export const PrintModeContext = React.createContext({ printMode: false });

export const EditModeContext = React.createContext({ editModeOn: false });

export const SectionEditModeContext = React.createContext({ sectionEditModeOn: false });

const defaultEditWrapperState = {
  fieldContexts: {},
  onSaveForm: noop,
  sectionEditModeOn: noop,
  turnOnSectionEditMode: noop,
  turnOffSectionEditMode: noop,
};
export const EditWrapperStateContext = React.createContext(defaultEditWrapperState);
