import { createSelector } from 'reselect';


const TOAST_TYPE_MAP = {
  'CR': 'CR',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'OFFICER': 'Officer',
  'UNIT > OFFICERS': 'Officer',
  'DATE > OFFICERS': 'Officer',
  'TRR': 'TRR',
  'DATE > TRR': 'TRR',
};

export const getToast = createSelector(
  state => state.toast,
  item => ({
    actionType: item.isPinned ? 'removed' : 'added',
    type: TOAST_TYPE_MAP[item.type],
  })
);
