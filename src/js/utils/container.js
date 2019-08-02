import { omit } from 'lodash';


export const mergeEditWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  const editWrapperStateProps = {
    fields: stateProps.fields,
    sectionEditModeOn: stateProps.sectionEditModeOn,
    onSaveForm: dispatchProps.onSaveForm,
    turnOnSectionEditMode: dispatchProps.turnOnSectionEditMode,
    turnOffSectionEditMode: dispatchProps.turnOffSectionEditMode,
  };
  return {
    ...ownProps,
    ...omit(stateProps, ['fields', 'sectionEditModeOn']),
    ...omit(dispatchProps, ['onSaveForm', 'turnOnSectionEditMode', 'turnOffSectionEditMode']),
    editWrapperStateProps,
  };
};
