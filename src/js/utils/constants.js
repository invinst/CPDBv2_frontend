import Enum from 'enum';

import {
  darkSilverSandColor, skepticColor, jaggedIceColor, romanticColor, porcelainColor, botticelliColor,
  galleryColor, lightAltoColor, greyColor, softBlackColor
} from 'utils/styles';

export const TOP = 'top';
export const BOTTOM = 'bottom';

export const MOBILE_BREAK_POINT = 768;
export const TABLET_BREAK_POINT = 992;
export const DESKTOP_BREAK_POINT = 1200;

export const DEFAULT_IMAGE_DIMENSION = '480_320';

export const EXTRA_WIDE = 'extra_wide';
export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';
export const TABLET = 'tablet';

export const ROOT_PATH = '/';
export const COLLAB_PATH = 'collaborate/';
export const SEARCH_PATH = 'search/';
export const SEARCH_TERMS_PATH = 'terms/';
export const SEARCH_ALIAS_EDIT_PATH = `${SEARCH_PATH}alias/`;
export const INLINE_SEARCH_ALIAS_ADMIN_PATH = `${SEARCH_ALIAS_EDIT_PATH}form/`;
export const OFFICER_PATH = 'officer/:officerId';
export const OFFICER_SOCIAL_GRAPH_SUFFIX = 'social/';
export const OFFICER_SOCIAL_GRAPH_PATH = `officer/:officerId/${OFFICER_SOCIAL_GRAPH_SUFFIX}`;
export const STANDALONE_CR_PATH = 'complaint/:crid';
export const CR_PATH_SUFFIX = ':officerId';
export const TTR_PATH = 'trr/:trrId';
export const UNIT_PROFILE_PATH = 'unit/:unitName';

export const ROOT_EDIT_REGEX = /^\/(?:edit\/)?$/;

// Reducer defaults
export const PAGINATION_DEFAULT = {
  results: [],
  count: 0,
  next: null,
  previous: null
};

// Date format
export const DATE_FORMAT_IN = 'YYYY-MM-DD';
export const DATE_FORMAT = 'MMM DD, YYYY';

// Form state
export const FORM_INITIAL = 'FORM_INITIAL';
export const FORM_LOADING = 'FORM_LOADING';
export const FORM_SUCCESS = 'FORM_SUCCESS';
export const FORM_FAILURE = 'FORM_FAILURE';

export const ENTITY_LINK = 'LINK';

let API_ROOT = `${global.location.origin}/api/v1/`;
let API_ROOT_V2 = `${global.location.origin}/api/v2/`;

let basePath = global.location.origin;

/* istanbul ignore next */
if (global.DEVELOPMENT) {
  basePath = 'http://localhost:8000';
  API_ROOT = `${basePath}/api/v1/`;
  API_ROOT_V2 = `${basePath}/api/v2/`;
}

export const BASE_PATH = basePath;

export const V2_ROOT_PATH = API_ROOT_V2;
export const V1_ROOT_PATH = API_ROOT;
export const INVISIBLE_INSTITUTE_URL = 'https://invisible.institute/introduction';

export const SLUG_PAGE_API_URL = `${V2_ROOT_PATH}cms-pages/`;
export const LANDING_PAGE_API_URL = `${SLUG_PAGE_API_URL}landing-page/`;
export const SIGNIN_URL = `${V2_ROOT_PATH}users/sign-in/`;
export const RESET_PASSWORD_URL = `${V2_ROOT_PATH}users/forgot-password/`;
export const MAIL_CHIMP_URL = '/vftg/';
export const EVENTS_API_URL = `${V2_ROOT_PATH}events/`;
export const OFFICER_URL = `${V2_ROOT_PATH}officers/`;
export const OFFICERS_BY_ALLEGATION_API_URL = `${OFFICER_URL}top-by-allegation/`;
export const CR_URL = `${V2_ROOT_PATH}cr/`;
export const RECENT_DOCUMENT_URL = `${CR_URL}list-by-new-document/`;
export const RECENT_COMPLAINT_SUMMARIES_URL = `${CR_URL}complaint-summaries/`;
export const UNIT_PROFILE_URL = `${V2_ROOT_PATH}units/`;
export const UPDATE_ALIAS_URL = `${V2_ROOT_PATH}aliases/`;
export const ACTIVITY_GRID_API_URL = `${V2_ROOT_PATH}activity-grid/`;
export const SEARCH_TERMS_CATEGORIES_API_URL = `${V2_ROOT_PATH}search-term-categories/`;
export const CITY_SUMMARY_API_URL = `${V2_ROOT_PATH}city-summary/`;
export const TRR_URL = `${V2_ROOT_PATH}trr/`;
export const POPUP_API_URL = `${V2_ROOT_PATH}popup/`;

export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const UNIT_PROFILE_SUMMARY_REQUEST_START = 'UNIT_PROFILE_SUMMARY_REQUEST_START';
export const UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS = 'UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS';
export const UNIT_PROFILE_SUMMARY_REQUEST_FAILURE = 'UNIT_PROFILE_SUMMARY_REQUEST_FAILURE';

export const OPEN_OFFICER_PAGE = 'OPEN_OFFICER_PAGE';
export const OPEN_OFFICER_SOCIAL_GRAPH_PAGE = 'OPEN_OFFICER_SOCIAL_GRAPH_PAGE';
export const OPEN_COMPLAINT_PAGE = 'OPEN_COMPLAINT_PAGE';
export const OPEN_TRR_PAGE = 'OPEN_TRR_PAGE';
export const OPEN_POLICE_UNIT_PAGE = 'OPEN_POLICE_UNIT_PAGE';

export const OPEN_SEARCH_PAGE = 'OPEN_SEARCH_PAGE';

export const CR_REQUEST_START = 'CR_REQUEST_START';
export const CR_REQUEST_SUCCESS = 'CR_REQUEST_SUCCESS';
export const CR_REQUEST_FAILURE = 'CR_REQUEST_FAILURE';

export const CR_REQUEST_DOC_FAILURE = 'CR_REQUEST_DOC_FAILURE';
export const CR_REQUEST_DOC_SUCCESS = 'CR_REQUEST_DOC_SUCCESS';
export const CR_REQUEST_DOC_START = 'CR_REQUEST_DOC_START';

export const TRR_REQUEST_START = 'TRR_REQUEST_START';
export const TRR_REQUEST_SUCCESS = 'TRR_REQUEST_SUCCESS';
export const TRR_REQUEST_FAILURE = 'TRR_REQUEST_FAILURE';

export const TRR_REQUEST_DOC_REQUEST_FAILURE = 'TRR_REQUEST_DOC_REQUEST_FAILURE';
export const TRR_REQUEST_DOC_REQUEST_SUCCESS = 'TRR_REQUEST_DOC_REQUEST_SUCCESS';
export const TRR_REQUEST_DOC_REQUEST_START = 'TRR_REQUEST_DOC_REQUEST_START';



export const ALPHA_NUMBERIC = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
  'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

export const SEARCH_PAGE_NAVIGATION_KEYS = ['up', 'down'];
export const SEARCH_TERMS_NAVIGATION_KEYS = ['up', 'down'];

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';
export const RECEIVE_TOKEN_FROM_COOKIE = 'RECEIVE_TOKEN_FROM_COOKIE';

export const LOG_OUT = 'LOG_OUT';

export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START';
export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS';
export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE';

export const OFFICER_COACCUSALS_REQUEST_START = 'OFFICER_COACCUSALS_REQUEST_START';
export const OFFICER_COACCUSALS_REQUEST_SUCCESS = 'OFFICER_COACCUSALS_REQUEST_SUCCESS';
export const OFFICER_COACCUSALS_REQUEST_FAILURE = 'OFFICER_COACCUSALS_REQUEST_FAILURE';

export const OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER = 'OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER';

export const POPUP_REQUEST_START = 'POPUP_REQUEST_START';
export const POPUP_REQUEST_SUCCESS = 'POPUP_REQUEST_SUCCESS';
export const POPUP_REQUEST_FAILURE = 'POPUP_REQUEST_FAILURE';

export const SEARCH_TERMS_CATEGORIES_REQUEST_START = 'SEARCH_TERMS_CATEGORIES_REQUEST_START';
export const SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS = 'SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS';
export const SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE = 'SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE';

export const DO_NOTHING_ACTION = 'DO_NOTHING_ACTION';  // To be used when an action that do nothing is needed
export const CHANGE_OFFICER_ID = 'CHANGE_OFFICER_ID';
export const CHANGE_OFFICER_TAB = 'CHANGE_OFFICER_TAB';

export const UPDATE_SHAREABLE_PAGE_SCROLL_POSITION = 'UPDATE_SHAREABLE_PAGE_SCROLL_POSITION';

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGplNHMifQ.ky2VSGEYU5KritRMArHY-w';

export const FINDING_COLORS = {
  'Unfounded': darkSilverSandColor,
  'Exonerated': skepticColor,
  'Not Sustained': jaggedIceColor,
  'Sustained': romanticColor,
  'No Cooperation': porcelainColor,
  'No Affidavit': botticelliColor,
  'Discharged': galleryColor,
  'Unknown': lightAltoColor
};

export const ACTIVITY_GRID_REQUEST_START = 'ACTIVITY_GRID_REQUEST_START';
export const ACTIVITY_GRID_REQUEST_SUCCESS = 'ACTIVITY_GRID_REQUEST_SUCCESS';
export const ACTIVITY_GRID_REQUEST_FAILURE = 'ACTIVITY_GRID_REQUEST_FAILURE';

export const OFFICERS_BY_ALLEGATION_REQUEST_START = 'OFFICERS_BY_ALLEGATIONS_REQUEST_START';
export const OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS = 'OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS';
export const OFFICERS_BY_ALLEGATION_REQUEST_FAILURE = 'OFFICERS_BY_ALLEGATION_REQUEST_FAILURE';

export const RECENT_DOCUMENT_REQUEST_START = 'RECENT_DOCUMENT_REQUEST_START';
export const RECENT_DOCUMENT_REQUEST_SUCCESS = 'RECENT_DOCUMENT_REQUEST_SUCCESS';
export const RECENT_DOCUMENT_REQUEST_FAILURE = 'RECENT_DOCUMENT_REQUEST_FAILURE';

export const RECENT_COMPLAINT_SUMMARIES_REQUEST_START = 'RECENT_COMPLAINT_SUMMARIES_REQUEST_START';
export const RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS = 'RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS';
export const RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE = 'RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE';

export const OFFICER_SOCIAL_GRAPH_REQUEST_START = 'OFFICER_SOCIAL_GRAPH_REQUEST_START';
export const OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS = 'OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS';
export const OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE = 'OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE';
export const OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE = 'OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE';

export const SUGGESTION_SINGLE_REQUEST_START = 'SUGGESTION_SINGLE_REQUEST_START';
export const SUGGESTION_SINGLE_REQUEST_SUCCESS = 'SUGGESTION_SINGLE_REQUEST_SUCCESS';
export const SUGGESTION_SINGLE_REQUEST_FAILURE = 'SUGGESTION_SINGLE_REQUEST_FAILURE';

export const CITY_SUMMARY_REQUEST_START = 'CITY_SUMMARY_REQUEST_START';
export const CITY_SUMMARY_REQUEST_SUCCESS = 'CITY_SUMMARY_REQUEST_SUCCESS';
export const CITY_SUMMARY_REQUEST_FAILURE = 'CITY_SUMMARY_REQUEST_FAILURE';

export const COMMUNITY_REQUEST_START = 'COMMUNITY_REQUEST_START';
export const COMMUNITY_REQUEST_SUCCESS = 'COMMUNITY_REQUEST_SUCCESS';
export const COMMUNITY_REQUEST_FAILURE = 'COMMUNITY_REQUEST_FAILURE';

export const SEARCH_TERMS_NAVIGATION_UP = 'SEARCH_TERMS_NAVIGATION_UP';
export const SEARCH_TERMS_NAVIGATION_DOWN = 'SEARCH_TERMS_NAVIGATION_DOWN';
export const SEARCH_TERMS_NAVIGATION_RESET = 'SEARCH_TERMS_NAVIGATION_RESET';
export const SEARCH_TERMS_NAVIGATION_SET = 'SEARCH_TERMS_NAVIGATION_SET';

export const PAGE_LOAD_START = 'PAGE_LOAD_START';
export const PAGE_LOAD_FINISH = 'PAGE_LOAD_FINISH';


export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const SELECT_TAG = 'SELECT_TAG';
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const TRACK_RECENT_SUGGESTION = 'TRACK_RECENT_SUGGESTION';
export const SEARCH_NAVIGATION_UP = 'SEARCH_NAVIGATION_UP';
export const SEARCH_NAVIGATION_DOWN = 'SEARCH_NAVIGATION_DOWN';
export const SEARCH_NAVIGATION_RESET = 'SEARCH_NAVIGATION_RESET';
export const SEARCH_NAVIGATION_SET = 'SEARCH_NAVIGATION_SET';

export const RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START = 'RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START';
export const RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS = 'RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS';
export const RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE = 'RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE';
export const RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START = 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START';
export const RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS = 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS';
export const RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE = 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE';

export const VISUAL_TOKEN_CR_DOMAIN = [1, 5, 10, 25, 40];
export const VISUAL_TOKEN_COLOR_SCHEME = {
  '00': '#f5f4f4',
  '10': '#edf0fa',
  '01': '#f8eded',
  '20': '#d4e2f4',
  '11': '#ecdeef',
  '02': '#efdede',
  '30': '#c6d4ec',
  '21': '#d9d1ee',
  '12': '#eacbe0',
  '03': '#ebcfcf',
  '40': '#aec9e8',
  '31': '#c0c3e1',
  '22': '#cdbddd',
  '13': '#e4b8cf',
  '04': '#f0b8b8',
  '50': '#90b1f5',
  '41': '#aaace3',
  '32': '#b6a5de',
  '23': '#c99edc',
  '14': '#e498b6',
  '05': '#f89090',
  '51': '#748be4',
  '42': '#8e84e0',
  '33': '#af7fbd',
  '24': '#c873a2',
  '15': '#e1718a',
  '52': '#6660ae',
  '43': '#8458aa',
  '34': '#a34e99',
  '25': '#b5496a',
  '53': '#4c3d8f',
  '44': '#6b2e7e',
  '35': '#792f55',
  '54': '#391c6a',
  '45': '#520051',
  '55': '#131313',
};

export const OIG_VISUAL_TOKEN_COLOR_SCHEME = {
  '00': '#f5f4f4',
  '01': '#fce0e0',
  '02': '#f6c9d0',
  '03': '#f6a8a7',
  '04': '#f28081',
  '05': '#ef6f70',
  '10': '#f9dec7',
  '11': '#f9d3c3',
  '12': '#f3adad',
  '13': '#f39f8e',
  '14': '#f18075',
  '15': '#ed6154',
  '20': '#f5c5a2',
  '21': '#f3b094',
  '22': '#f4a298',
  '23': '#f28687',
  '24': '#ee6465',
  '25': '#e85050',
  '30': '#f9946b',
  '31': '#f88567',
  '32': '#ed7467',
  '33': '#fd5e4c',
  '34': '#ff5050',
  '35': '#ec3435',
  '40': '#fb7045',
  '41': '#fc5d2c',
  '42': '#f35c17',
  '43': '#f34339',
  '44': '#f32a29',
  '45': '#dc2c30',
  '50': '#f95125',
  '51': '#ff4f13',
  '52': '#f64016',
  '53': '#f42d1f',
  '54': '#f0201e',
  '55': '#f52524',
};

export const OIG_EXTRA_BLUE_COLOR_SCHEME = {
  '0': '#f5f4f4',
  '1': '#dde6f7',
  '2': '#d1ddf1',
  '3': '#bdc7ec',
  '4': '#8498d8',
  '5': '#405ec3',
};

export const OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT = {
  COLOR_TEXT_LIGHT_SCHEME: ['55', '54', '45', '44'],
  DARK_COLOR: softBlackColor,
  LIGHT_COLOR: greyColor
};

export const RECENT_CONTENT_TYPE = 'RECENT';
export const MORE_BUTTON = 'MORE_BUTTON';
export const SEARCH_BOX = 'SEARCH_BOX';

export const SEARCH_CATEGORIES = [
  'OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT > OFFICERS', 'CR',
  'BEAT', 'POLICE-DISTRICT', 'WARD', 'SCHOOL-GROUND', 'UNIT'
];

export const TURN_ON_LOGO_EDIT_MODE = 'TURN_ON_LOGO_EDIT_MODE';
export const TURN_OFF_LOGO_EDIT_MODE = 'TURN_OFF_LOGO_EDIT_MODE';

export const TURN_ON_CAROUSEL_HEADER_EDIT_MODE = 'TURN_ON_CAROUSEL_HEADER_EDIT_MODE';
export const TURN_OFF_CAROUSEL_HEADER_EDIT_MODE = 'TURN_OFF_CAROUSEL_HEADER_EDIT_MODE';

export const CAROUSEL_TYPES = new Enum(['COMPLAINT', 'ACTIVITY', 'ALLEGATION', 'DOCUMENT']);

export const UPDATE_CMS_PAGE_REQUEST_START = 'UPDATE_CMS_PAGE_REQUEST_START';
export const UPDATE_CMS_PAGE_REQUEST_SUCCESS = 'UPDATE_CMS_PAGE_REQUEST_SUCCESS';
export const UPDATE_CMS_PAGE_REQUEST_FAILURE = 'UPDATE_CMS_PAGE_REQUEST_FAILURE';
export const CMS_PAGE_REQUEST_START = 'CMS_PAGE_REQUEST_START';
export const CMS_PAGE_REQUEST_SUCCESS = 'CMS_PAGE_REQUEST_SUCCESS';
export const CMS_PAGE_REQUEST_FAILURE = 'CMS_PAGE_REQUEST_FAILURE';

export const CLUSTER_GEO_REQUEST_START = 'CLUSTER_GEO_REQUEST_START';
export const CLUSTER_GEO_REQUEST_SUCCESS = 'CLUSTER_GEO_REQUEST_SUCCESS';
export const CLUSTER_GEO_REQUEST_FAILURE = 'CLUSTER_GEO_REQUEST_FAILURE';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const LANDING_PAGE_ID = 'landing-page';

export const NEW_TIMELINE_ITEMS = {
  CR: 'CR',
  FORCE: 'FORCE',
  AWARD: 'AWARD',
  UNIT_CHANGE: 'UNIT_CHANGE',
  RANK_CHANGE: 'RANK_CHANGE',
  JOINED: 'JOINED',
  YEAR: 'YEAR',
  EMPTY: 'EMPTY',
};

export const NEW_TIMELINE_FILTERS = {
  ALL: {
    label: 'ALL',
    kind: [NEW_TIMELINE_ITEMS.CR, NEW_TIMELINE_ITEMS.FORCE, NEW_TIMELINE_ITEMS.AWARD],
  },
  CRS: {
    label: 'COMPLAINTS',
    kind: [NEW_TIMELINE_ITEMS.CR],
  },
  FORCE: {
    label: 'USE OF FORCE',
    kind: [NEW_TIMELINE_ITEMS.FORCE],
  },
  AWARDS: {
    label: 'AWARDS',
    kind: [NEW_TIMELINE_ITEMS.AWARD],
  },
};

export const DISTANCE_OPTIONS = {
  '0.5mi': '0.5 MILES',
  '1mi': '1 MILES',
  '2.5mi': '2.5 MILES',
  '5mi': '5 MILES',
  '10mi': '10 MILES'
};

export const QA_LINK = 'http://how.cpdp.works/';

export const ATTACHMENT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
};

export const OFFICER_PAGE_TAB_NAMES = {
  TIMELINE: 'TIMELINE',
  MAP: 'MAP',
  COACCUSALS: 'COACCUSALS',
  ATTACHMENTS: 'ATTACHMENTS',
};

export const MAP_INFO = {
  CENTER_LAT: 41.85677,
  CENTER_LNG: -87.6024055,
  ZOOM1: 9,
  ZOOM2: 13,
};

export const MAP_ITEMS = {
  CR: 'CR',
  FORCE: 'FORCE',
};

export const ACTIVITY_GRID_CARD_TYPES = {
  OFFICER: 'single_officer',
  PAIR: 'coaccused_pair'
};

export const POPUP_NAMES = {
  OFFICER: {
    ALLEGATION: 'allegation',
    SUSTAINED: 'sustained',
    TRR: 'trr',
    MAJOR_AWARD: 'majorAward',
    CIVILIAN_COMPLIMENT: 'civilianCompliment',
    HONORABLE_MENTION: 'honorableMention',
    UNIT: 'unit',
    RANK: 'rank',
    SALARY: 'salary',
  },
  COMPLAINT: {
    CATEGORY: 'category',
    ACCUSED_OFFICER: 'accusedOfficer',
    INVESTIGATOR: 'investigator',
    POLICE_WITNESS: 'policeWitness',
  },
  TRR: {
    FORCE_CATEGORY: 'forceCategory',
    TYPES_OF_FORCE: 'typeOfForce',
  }
};
