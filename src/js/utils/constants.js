import Enum from 'enum';

import {
  darkSilverSandColor, skepticColor, jaggedIceColor, romanticColor, porcelainColor, botticelliColor,
  galleryColor, lightAltoColor, visualTokenSchemeColor, greyColor, softBlackColor
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
export const DATA_PATH = 'data/';
export const FAQ_PATH = 'faq/';
export const STORIES_PATH = 'reporting/';
export const SEARCH_PATH = 'search/';
export const SEARCH_TERMS_PATH = 'terms/';
export const SEARCH_ALIAS_EDIT_PATH = `${SEARCH_PATH}alias/`;
export const INLINE_SEARCH_ALIAS_ADMIN_PATH = `${SEARCH_ALIAS_EDIT_PATH}form/`;
export const OFFICER_PATH = 'officer/:officerId';
export const OFFICER_TIMELINE_SUFFIX = 'timeline/';
export const OFFICER_SOCIAL_GRAPH_SUFFIX = 'social/';
export const OFFICER_TIMELINE_PATH = `officer/:officerId/${OFFICER_TIMELINE_SUFFIX}`;
export const OFFICER_SOCIAL_GRAPH_PATH = `officer/:officerId/${OFFICER_SOCIAL_GRAPH_SUFFIX}`;
export const STANDALONE_CR_PATH = 'complaint/:crid';
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

export const SLUG_PAGE_API_URL = `${V2_ROOT_PATH}cms-pages/`;
export const LANDING_PAGE_API_URL = `${SLUG_PAGE_API_URL}landing-page/`;
export const SIGNIN_URL = `${V2_ROOT_PATH}users/sign-in/`;
export const RESET_PASSWORD_URL = `${V2_ROOT_PATH}users/forgot-password/`;
export const REPORTS_API_URL = `${V2_ROOT_PATH}reports/`;
export const FAQS_API_URL = `${V2_ROOT_PATH}faqs/`;
export const MAIL_CHIMP_URL = '/vftg/';
export const EVENTS_API_URL = `${V2_ROOT_PATH}events/`;
export const SEARCH_OFFICER_URL = `${V2_ROOT_PATH}report-bottomsheet-officer-search/`;
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

export const DragTypes = {
  FAQ_ITEM: 'FAQ_ITEM'
};

export const FAQS_REQUEST_START = 'FAQS_REQUEST_START';
export const FAQS_REQUEST_SUCCESS = 'FAQS_REQUEST_SUCCESS';
export const FAQS_REQUEST_FAILURE = 'FAQS_REQUEST_FAILURE';

export const FAQ_REQUEST_START = 'FAQ_REQUEST_START';
export const FAQ_REQUEST_SUCCESS = 'FAQ_REQUEST_SUCCESS';
export const FAQ_REQUEST_FAILURE = 'FAQ_REQUEST_FAILURE';

export const FAQS_POST_START = 'FAQS_POST_START';
export const FAQS_POST_SUCCESS = 'FAQS_POST_SUCCESS';
export const FAQS_POST_FAILURE = 'FAQS_POST_FAILURE';

export const UPDATE_FAQ_REQUEST_START = 'UPDATE_FAQ_REQUEST_START';
export const UPDATE_FAQ_REQUEST_SUCCESS = 'UPDATE_FAQ_REQUEST_SUCCESS';
export const UPDATE_FAQ_REQUEST_FAILURE = 'UPDATE_FAQ_REQUEST_FAILURE';

export const BULK_UPDATE_FAQS_START = 'BULK_UPDATE_FAQS_START';
export const BULK_UPDATE_FAQS_SUCCESS = 'BULK_UPDATE_FAQS_SUCCESS';
export const BULK_UPDATE_FAQS_FAILURE = 'BULK_UPDATE_FAQS_FAILURE';

export const SEARCH_OFFICERS_REQUEST_START = 'SEARCH_OFFICERS_REQUEST_START';
export const SEARCH_OFFICERS_REQUEST_SUCCESS = 'SEARCH_OFFICERS_REQUEST_SUCCESS';
export const SEARCH_OFFICERS_REQUEST_FAILURE = 'SEARCH_OFFICERS_REQUEST_FAILURE';

export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const OFFICER_METRICS_REQUEST_START = 'OFFICER_METRICS_REQUEST_START';
export const OFFICER_METRICS_REQUEST_SUCCESS = 'OFFICER_METRICS_REQUEST_SUCCESS';
export const OFFICER_METRICS_REQUEST_FAILURE = 'OFFICER_METRICS_REQUEST_FAILURE';

export const UNIT_PROFILE_SUMMARY_REQUEST_START = 'UNIT_PROFILE_SUMMARY_REQUEST_START';
export const UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS = 'UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS';
export const UNIT_PROFILE_SUMMARY_REQUEST_FAILURE = 'UNIT_PROFILE_SUMMARY_REQUEST_FAILURE';

export const OPEN_BOTTOM_SHEET_WITH_REPORT = 'OPEN_BOTTOM_SHEET_WITH_REPORT';
export const OPEN_BOTTOM_SHEET_WITH_FAQ = 'OPEN_BOTTOM_SHEET_WITH_FAQ';
export const OPEN_OFFICER_PAGE = 'OPEN_OFFICER_PAGE';
export const OPEN_OFFICER_SOCIAL_GRAPH_PAGE = 'OPEN_OFFICER_SOCIAL_GRAPH_PAGE';
export const OPEN_COMPLAINT_PAGE = 'OPEN_COMPLAINT_PAGE';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';
export const OPEN_BOTTOM_SHEET_TO_CREATE_FAQ = 'OPEN_BOTTOM_SHEET_TO_CREATE_FAQ';
export const OPEN_BOTTOM_SHEET_TO_CREATE_REPORT = 'OPEN_BOTTOM_SHEET_TO_CREATE_REPORT';
export const OPEN_POLICE_UNIT_PAGE = 'OPEN_POLICE_UNIT_PAGE';

export const OPEN_SEARCH_PAGE = 'OPEN_SEARCH_PAGE';

export const CR_REQUEST_START = 'CR_REQUEST_START';
export const CR_REQUEST_SUCCESS = 'CR_REQUEST_SUCCESS';
export const CR_REQUEST_FAILURE = 'CR_REQUEST_FAILURE';

export const CR_REQUEST_DOC_FAILURE = 'CR_REQUEST_DOC_FAILURE';
export const CR_REQUEST_DOC_SUCCESS = 'CR_REQUEST_DOC_SUCCESS';
export const CR_REQUEST_DOC_START = 'CR_REQUEST_DOC_START';



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

export const OFFICER_TIMELINE_MINIMAP_REQUEST_START = 'OFFICER_TIMELINE_MINIMAP_REQUEST_START';
export const OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS = 'OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE = 'OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE';
export const OFFICER_TIMELINE_ITEMS_REQUEST_START = 'OFFICER_TIMELINE_ITEMS_REQUEST_START';
export const OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS = 'OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS = 'OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE = 'OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE';
export const OFFICER_TIMELINE_FLIP_SORT_ORDER = 'OFFICER_TIMELINE_FLIP_SORT_ORDER';
export const OFFICER_TIMELINE_SELECT_MINIMAP_ITEM = 'OFFICER_TIMELINE_SELECT_MINIMAP_ITEM';
export const OFFICER_TIMELINE_HOVER_MINIMAP_ITEM = 'OFFICER_TIMELINE_HOVER_MINIMAP_ITEM';
export const OFFICER_TIMELINE_HOVER_TIMELINE_ITEM = 'OFFICER_TIMELINE_HOVER_TIMELINE_ITEM';
export const OFFICER_TIMELINE_SELECT_TIMELINE_ITEM = 'OFFICER_TIMELINE_SELECT_TIMELINE_ITEM';
export const OFFICER_TIMELINE_CHANGE_FILTERS = 'OFFICER_TIMELINE_CHANGE_FILTERS';
export const OFFICER_TIMELINE_CLEAR_SELECTED_ITEM_INDEX = 'OFFICER_TIMELINE_CLEAR_SELECTED_ITEM_INDEX';

export const SEARCH_TERMS_CATEGORIES_REQUEST_START = 'SEARCH_TERMS_CATEGORIES_REQUEST_START';
export const SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS = 'SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS';
export const SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE = 'SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE';

export const DO_NOTHING_ACTION = 'DO_NOTHING_ACTION';  // To be used when an action that do nothing is needed
export const CHANGE_OFFICER_ID = 'CHANGE_OFFICER_ID';

export const UPDATE_SHAREABLE_PAGE_SCROLL_POSITION = 'UPDATE_SHAREABLE_PAGE_SCROLL_POSITION';


export const BottomSheetContentType = new Enum(['REPORT', 'FAQ', 'OFFICER', 'CR', 'UNIT_PROFILE']);

export const TimelineItemType = new Enum(['CR', 'UNIT', 'JOINED']);

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

export const PERCENTILE_REQUEST_START = 'PERCENTILE_REQUEST_START';
export const PERCENTILE_REQUEST_SUCCESS = 'PERCENTILE_REQUEST_SUCCESS';
export const PERCENTILE_REQUEST_FAILURE = 'PERCENTILE_REQUEST_FAILURE';

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
  '000': visualTokenSchemeColor.greyColor,
  '100': visualTokenSchemeColor.lightYellowColor,
  '110': visualTokenSchemeColor.lightYellowColor,
  '120': visualTokenSchemeColor.lightYellowColor,
  '200': visualTokenSchemeColor.yellowColor,
  '210': visualTokenSchemeColor.yellowColor,
  '220': visualTokenSchemeColor.yellowColor,
  '010': visualTokenSchemeColor.lightBlueColor,
  '020': visualTokenSchemeColor.blueColor,
  '001': visualTokenSchemeColor.pinkColor,
  '011': visualTokenSchemeColor.pinkColor,
  '021': visualTokenSchemeColor.pinkColor,
  '101': visualTokenSchemeColor.darkerPinkColor,
  '111': visualTokenSchemeColor.darkerPinkColor,
  '121': visualTokenSchemeColor.darkerPinkColor,
  '002': visualTokenSchemeColor.redColor,
  '012': visualTokenSchemeColor.redColor,
  '022': visualTokenSchemeColor.redColor,
  '102': visualTokenSchemeColor.darkerRedColor,
  '112': visualTokenSchemeColor.darkerRedColor,
  '122': visualTokenSchemeColor.darkerRedColor,
  '201': visualTokenSchemeColor.lightRedColor,
  '211': visualTokenSchemeColor.lightRedColor,
  '221': visualTokenSchemeColor.lightRedColor,
  '202': visualTokenSchemeColor.darkestRedColor,
  '212': visualTokenSchemeColor.darkestRedColor,
  '222': visualTokenSchemeColor.darkestRedColor,
};

export const OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT = {
  COLOR_TEXT_LIGHT_SCHEME: ['202', '212', '222', '020'],
  DARK_COLOR: softBlackColor,
  LIGHT_COLOR: greyColor
};

export const RECENT_CONTENT_TYPE = 'RECENT';
export const MORE_BUTTON = 'MORE_BUTTON';
export const SEARCH_BOX = 'SEARCH_BOX';

export const SEARCH_CATEGORIES = [
  'OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT', 'UNIT > OFFICERS', 'CR'
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

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const LANDING_PAGE_ID = 'landing-page';
