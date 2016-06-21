import { createSelector } from 'reselect';


const bottomSheetSelector = state => state.landingPage.bottomSheet;

export const contentSelector = createSelector(bottomSheetSelector, bottomSheet => bottomSheet.content);
