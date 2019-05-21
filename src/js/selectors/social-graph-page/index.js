import { isEmpty } from 'lodash';

export const hasComplaintSelector = state => !isEmpty(state.socialGraphPage.networkData.networkAllegations);
export const getCurrentMainTab = state => state.socialGraphPage.currentMainTab;
export const getCurrentNetworkTab = state => state.socialGraphPage.networkData.currentNetworkTab;
