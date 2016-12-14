import { createAction } from 'redux-actions';
import { get, authenticatedPatch } from 'actions/common/async-action';
import { V2_ROOT_PATH } from 'utils/axios-client';


export const LANDING_PAGE_REQUEST_START = 'LANDING_PAGE_REQUEST_START';
export const LANDING_PAGE_REQUEST_SUCCESS = 'LANDING_PAGE_REQUEST_SUCCESS';
export const LANDING_PAGE_REQUEST_FAILURE = 'LANDING_PAGE_REQUEST_FAILURE';

export const LANDING_PAGE_API_URL = `${V2_ROOT_PATH}cms-pages/landing-page/`;

export const requestLandingPage = get(
  LANDING_PAGE_API_URL, [LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE]
);

export const updateLandingPage = authenticatedPatch(
  LANDING_PAGE_API_URL, [
    LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
  ]
);

export const COLLABORATE = 'COLLABORATE';
export const ABOUT = 'ABOUT';
export const VFTG = 'VFTG';
export const FAQ = 'FAQ';
export const REPORTING = 'REPORTING';
export const HERO = 'HERO';

export const TURN_ON_SECTION_EDIT_MODE = 'TURN_ON_SECTION_EDIT_MODE';
export const TURN_OFF_SECTION_EDIT_MODE = 'TURN_OFF_SECTION_EDIT_MODE';

export const turnOnSectionEditMode = createAction(TURN_ON_SECTION_EDIT_MODE);
export const turnOffSectionEditMode = createAction(TURN_OFF_SECTION_EDIT_MODE);
