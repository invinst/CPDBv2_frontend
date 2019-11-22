import Enum from 'enum';
import { kebabCase } from 'lodash';

import {
  darkSilverSandColor, skepticColor, jaggedIceColor, romanticColor, porcelainColor, botticelliColor,
  galleryColor, lightAltoColor, greyColor, softBlackColor,
} from 'utils/styles';
import config from 'config';

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
export const SEARCH_ALIAS_EDIT_PATH = `${SEARCH_PATH}alias/`;
export const INLINE_SEARCH_ALIAS_ADMIN_PATH = `${SEARCH_ALIAS_EDIT_PATH}form/`;
export const OFFICER_PATH = 'officer/:officerId(/:fullName)(/:tab)';
export const STANDALONE_CR_PATH = 'complaint/:crid';
export const CR_PATH_SUFFIX = ':officerId';
export const TTR_PATH = 'trr/:trrId';
export const UNIT_PROFILE_PATH = 'unit/:unitName';
export const CRAWLERS_PATH = 'crawlers/';
export const DOCUMENT_PATH = 'document/:attachmentId';
export const EMBED_MAP_PATH = 'embed/map';
export const EMBED_TOP_OFFICERS_PATH = 'embed/top-officers-page';
export const EMBED_OFFICERS_PATH = 'embed/officers';
export const TRACKER_ALL_DOCUMENTS_PATH = 'documents/crid/:crid';
export const TRACKER_DOCUMENTS_OVERVIEW_PATH = 'documents/';
export const SOCIAL_GRAPH_PATH = 'social-graph/';
export const PINBOARD_PATH = 'pinboard(/:pinboardId)(/:pinboardTitle)';
export const PINBOARD_ADMIN_PATH = 'view-all-pinboards/';

export const ROOT_EDIT_REGEX = /^\/(?:edit\/)?$/;

// Reducer defaults
export const PAGINATION_DEFAULT = {
  results: [],
  count: 0,
  next: null,
  previous: null,
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

let API_ROOT = `${config.apiDomain}/api/v1/`;
let API_ROOT_V2 = `${config.apiDomain}/api/v2/`;

export const BASE_PATH = config.apiDomain;

export const V2_ROOT_PATH = API_ROOT_V2;
export const V1_ROOT_PATH = API_ROOT;
export const INVISIBLE_INSTITUTE_URL = 'https://invisible.institute/cpdp';

export const SLUG_PAGE_API_URL = `${V2_ROOT_PATH}cms-pages/`;
export const LANDING_PAGE_API_URL = `${SLUG_PAGE_API_URL}landing-page/`;
export const SIGNIN_URL = `${V2_ROOT_PATH}users/sign-in/`;
export const RESET_PASSWORD_URL = `${V2_ROOT_PATH}users/forgot-password/`;
export const MAIL_CHIMP_URL = '/vftg/';
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
export const DOCUMENTS_URL = `${V2_ROOT_PATH}attachments/`;
export const CRAWLERS_API_URL = `${V2_ROOT_PATH}document-crawlers/`;
export const SOCIAL_GRAPH_NETWORK_API_URL = `${V2_ROOT_PATH}social-graph/network/`;
export const SOCIAL_GRAPH_ALLEGATIONS_API_URL = `${V2_ROOT_PATH}social-graph/allegations/`;
export const SOCIAL_GRAPH_OFFICERS_API_URL = `${V2_ROOT_PATH}social-graph/officers/`;
export const SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL = `${V2_ROOT_PATH}social-graph/geographic-crs/`;
export const SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL = `${V2_ROOT_PATH}social-graph/geographic-trrs/`;
export const PINBOARDS_URL = `${V2_ROOT_PATH}pinboards/`;
export const ALL_PINBOARD_URL = `${V2_ROOT_PATH}pinboards/all/`;
export const RECENT_SEARCH_ITEMS_API_URL = 'suggestion/recent-search-items/';

export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const UNIT_PROFILE_SUMMARY_REQUEST_START = 'UNIT_PROFILE_SUMMARY_REQUEST_START';
export const UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS = 'UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS';
export const UNIT_PROFILE_SUMMARY_REQUEST_FAILURE = 'UNIT_PROFILE_SUMMARY_REQUEST_FAILURE';

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

export const CRAWLERS_REQUEST_START = 'CRAWLERS_REQUEST_START';
export const CRAWLERS_REQUEST_SUCCESS = 'CRAWLERS_REQUEST_SUCCESS';
export const CRAWLERS_REQUEST_FAILURE = 'CRAWLERS_REQUEST_FAILURE';

export const TRR_REQUEST_DOC_REQUEST_FAILURE = 'TRR_REQUEST_DOC_REQUEST_FAILURE';
export const TRR_REQUEST_DOC_REQUEST_SUCCESS = 'TRR_REQUEST_DOC_REQUEST_SUCCESS';
export const TRR_REQUEST_DOC_REQUEST_START = 'TRR_REQUEST_DOC_REQUEST_START';

export const DOCUMENT_REQUEST_START = 'DOCUMENT_REQUEST_START';
export const DOCUMENT_REQUEST_SUCCESS = 'DOCUMENT_REQUEST_SUCCESS';
export const DOCUMENT_REQUEST_FAILURE = 'DOCUMENT_REQUEST_FAILURE';

export const EMBED_OFFICERS_REQUEST_START = 'EMBED_OFFICERS_REQUEST_START';
export const EMBED_OFFICERS_REQUEST_SUCCESS = 'EMBED_OFFICERS_REQUEST_SUCCESS';
export const EMBED_OFFICERS_REQUEST_FAILURE = 'EMBED_OFFICERS_REQUEST_FAILURE';

export const TRACKING_CLICK_ATTACHMENT_START = 'TRACKING_CLICK_ATTACHMENT_START';
export const TRACKING_CLICK_ATTACHMENT_SUCCESS = 'TRACKING_CLICK_ATTACHMENT_SUCCESS';
export const TRACKING_CLICK_ATTACHMENT_FAILURE = 'TRACKING_CLICK_ATTACHMENT_FAILURE';

export const SOCIAL_GRAPH_NETWORK_REQUEST_START = 'SOCIAL_GRAPH_NETWORK_REQUEST_START';
export const SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS = 'SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS';
export const SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE = 'SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE';

export const GEOGRAPHIC_CRS_REQUEST_START = 'GEOGRAPHIC_CRS_REQUEST_START';
export const GEOGRAPHIC_CRS_REQUEST_SUCCESS = 'GEOGRAPHIC_CRS_REQUEST_SUCCESS';
export const GEOGRAPHIC_CRS_REQUEST_FAILURE = 'GEOGRAPHIC_CRS_REQUEST_FAILURE';

export const FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_START = 'FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_START';
export const FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS = 'FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS';
export const FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_FAILURE = 'FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_FAILURE';

export const GEOGRAPHIC_TRRS_REQUEST_START = 'GEOGRAPHIC_TRRS_REQUEST_START';
export const GEOGRAPHIC_TRRS_REQUEST_SUCCESS = 'GEOGRAPHIC_TRRS_REQUEST_SUCCESS';
export const GEOGRAPHIC_TRRS_REQUEST_FAILURE = 'GEOGRAPHIC_TRRS_REQUEST_FAILURE';

export const FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_START = 'FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_START';
export const FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS = 'FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS';
export const FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_FAILURE = 'FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_FAILURE';

export const FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START =
  'FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START';
export const FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS =
  'FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS';
export const FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE =
  'FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE';

export const GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START = 'GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START';
export const GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS = 'GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS';
export const GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE = 'GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE';

export const FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START =
  'FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START';
export const FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS =
  'FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS';
export const FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE =
  'FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE';

export const GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START = 'GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START';
export const GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS = 'GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS';
export const GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE = 'GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE';

export const SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START = 'SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START';
export const SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS = 'SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS';
export const SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE = 'SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE';

export const SOCIAL_GRAPH_OFFICERS_REQUEST_START = 'SOCIAL_GRAPH_OFFICERS_REQUEST_START';
export const SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS = 'SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS';
export const SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE = 'SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE';

export const ALPHA_NUMBERIC = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
  'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
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

export const OFFICER_CREATE_ZIP_FILE_REQUEST_START = 'OFFICER_CREATE_ZIP_FILE_REQUEST_START';
export const OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS = 'OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS';
export const OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE = 'OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE';

export const OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START = 'OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START';
export const OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS = 'OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS';
export const OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE = 'OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE';

export const OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START =
  'OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START';
export const OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS =
  'OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS';
export const OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE =
  'OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE';

export const POPUP_REQUEST_START = 'POPUP_REQUEST_START';
export const POPUP_REQUEST_SUCCESS = 'POPUP_REQUEST_SUCCESS';
export const POPUP_REQUEST_FAILURE = 'POPUP_REQUEST_FAILURE';

export const SEARCH_TERMS_CATEGORIES_REQUEST_START = 'SEARCH_TERMS_CATEGORIES_REQUEST_START';
export const SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS = 'SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS';
export const SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE = 'SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE';

export const DO_NOTHING_ACTION = 'DO_NOTHING_ACTION'; // To be used when an action that do nothing is needed
export const CHANGE_OFFICER_ID = 'CHANGE_OFFICER_ID';
export const CHANGE_OFFICER_TAB = 'CHANGE_OFFICER_TAB';
export const UPDATE_PATH_NAME = 'UPDATE_PATH_NAME';

export const UPDATE_SHAREABLE_PAGE_SCROLL_POSITION = 'UPDATE_SHAREABLE_PAGE_SCROLL_POSITION';

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGplNHMifQ.ky2VSGEYU5KritRMArHY-w';
export const MAPBOX_STYLE = 'mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte';

export const FINDING_COLORS = {
  'Unfounded': darkSilverSandColor,
  'Exonerated': skepticColor,
  'Not Sustained': jaggedIceColor,
  'Sustained': romanticColor,
  'No Cooperation': porcelainColor,
  'No Affidavit': botticelliColor,
  'Discharged': galleryColor,
  'Unknown': lightAltoColor,
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

export const SUGGESTION_SINGLE_REQUEST_START = 'SUGGESTION_SINGLE_REQUEST_START';
export const SUGGESTION_SINGLE_REQUEST_SUCCESS = 'SUGGESTION_SINGLE_REQUEST_SUCCESS';
export const SUGGESTION_SINGLE_REQUEST_FAILURE = 'SUGGESTION_SINGLE_REQUEST_FAILURE';
export const SUGGESTION_SINGLE_REQUEST_CANCELLED = 'SUGGESTION_SINGLE_REQUEST_CANCELLED';

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
export const SUGGESTION_REQUEST_CANCELLED = 'SUGGESTION_REQUEST_CANCELLED';

export const REQUEST_CANCEL_MESSAGE = 'Cancelled by user';

export const DOCUMENT_DEDUPLICATOR_REQUEST_FAILURE = 'DOCUMENT_DEDUPLICATOR_REQUEST_FAILURE';
export const DOCUMENT_DEDUPLICATOR_REQUEST_START = 'DOCUMENT_DEDUPLICATOR_REQUEST_START';
export const DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS = 'DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS';

export const DOCUMENT_VISIBILITY_TOGGLE_REQUEST_START = 'DOCUMENT_VISIBILITY_TOGGLE_REQUEST_START';
export const DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS = 'DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS';
export const DOCUMENT_VISIBILITY_TOGGLE_REQUEST_FAILURE = 'DOCUMENT_VISIBILITY_TOGGLE_REQUEST_FAILURE';

export const DOCUMENT_OVERVIEW_REQUEST_START = 'DOCUMENT_OVERVIEW_REQUEST_START';
export const DOCUMENT_OVERVIEW_REQUEST_SUCCESS = 'DOCUMENT_OVERVIEW_REQUEST_SUCCESS';
export const DOCUMENT_OVERVIEW_REQUEST_FAILURE = 'DOCUMENT_OVERVIEW_REQUEST_FAILURE';

export const SELECT_TAG = 'SELECT_TAG';
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
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

export const PINBOARD_CREATE_REQUEST_START = 'PINBOARD_CREATE_REQUEST_START';
export const PINBOARD_CREATE_REQUEST_SUCCESS = 'PINBOARD_CREATE_REQUEST_SUCCESS';
export const PINBOARD_CREATE_REQUEST_FAILURE = 'PINBOARD_CREATE_REQUEST_FAILURE';

export const PINBOARD_CREATE_NEW_REQUEST_START = 'PINBOARD_CREATE_NEW_REQUEST_START';
export const PINBOARD_CREATE_NEW_REQUEST_SUCCESS = 'PINBOARD_CREATE_NEW_REQUEST_SUCCESS';
export const PINBOARD_CREATE_NEW_REQUEST_FAILURE = 'PINBOARD_CREATE_NEW_REQUEST_FAILURE';

export const PINBOARD_UPDATE_REQUEST_FAILURE = 'PINBOARD_UPDATE_REQUEST_FAILURE';
export const PINBOARD_UPDATE_REQUEST_START = 'PINBOARD_UPDATE_REQUEST_START';
export const PINBOARD_UPDATE_REQUEST_SUCCESS = 'PINBOARD_UPDATE_REQUEST_SUCCESS';

export const PINBOARDS_FETCH_REQUEST_FAILURE = 'PINBOARDS_FETCH_REQUEST_FAILURE';
export const PINBOARDS_FETCH_REQUEST_START = 'PINBOARDS_FETCH_REQUEST_START';
export const PINBOARDS_FETCH_REQUEST_SUCCESS = 'PINBOARDS_FETCH_REQUEST_SUCCESS';

export const HIDE_SHOW_PINBOARDS_LIST = 'HIDE_SHOW_PINBOARDS_LIST';

export const PINBOARD_FETCH_REQUEST_FAILURE = 'PINBOARD_FETCH_REQUEST_FAILURE';
export const PINBOARD_FETCH_REQUEST_START = 'PINBOARD_FETCH_REQUEST_START';
export const PINBOARD_FETCH_REQUEST_SUCCESS = 'PINBOARD_FETCH_REQUEST_SUCCESS';

export const PINBOARD_COMPLAINTS_FETCH_REQUEST_START = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_START';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_OFFICERS_FETCH_REQUEST_START = 'PINBOARD_OFFICERS_FETCH_REQUEST_START';
export const PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS = 'PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE = 'PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE';
export const PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED = 'PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_TRRS_FETCH_REQUEST_START = 'PINBOARD_TRRS_FETCH_REQUEST_START';
export const PINBOARD_TRRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_TRRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_TRRS_FETCH_REQUEST_FAILURE = 'PINBOARD_TRRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_TRRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED';

export const PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE = 'PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE';
export const PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START = 'PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START';
export const PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS = 'PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS';

export const PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START';

export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED';

export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START';
export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS';
export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE';

export const ALL_PINBOARD_REQUEST_FAILURE = 'ALL_PINBOARD_REQUEST_FAILURE';
export const ALL_PINBOARD_REQUEST_START = 'ALL_PINBOARD_REQUEST_START';
export const ALL_PINBOARD_REQUEST_SUCCESS = 'ALL_PINBOARD_REQUEST_SUCCESS';

export const ADD_OR_REMOVE_ITEM_IN_PINBOARD = 'ADD_OR_REMOVE_ITEM_IN_PINBOARD';
export const ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE = 'ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE';
export const ADD_ITEM_IN_PINBOARD_PAGE = 'ADD_ITEM_IN_PINBOARD_PAGE';

export const REMOVE_ITEM_IN_PINBOARD_PAGE = 'REMOVE_ITEM_IN_PINBOARD_PAGE';
export const ORDER_PINBOARD = 'ORDER_PINBOARD';

export const ADD_ITEM_TO_PINBOARD_STATE = 'ADD_ITEM_TO_PINBOARD_STATE';
export const REMOVE_ITEM_FROM_PINBOARD_STATE = 'REMOVE_ITEM_FROM_PINBOARD_STATE';
export const ORDER_PINBOARD_STATE = 'ORDER_PINBOARD_STATE';
export const SAVE_PINBOARD = 'SAVE_PINBOARD';
export const SET_PINBOARD_HAS_PENDING_CHANGES = 'SET_PINBOARD_HAS_PENDING_CHANGES';
export const SAVE_PINBOARD_WITHOUT_CHANGING_STATE = 'SAVE_PINBOARD_WITHOUT_CHANGING_STATE';
export const HANDLE_REMOVING_ITEM_IN_PINBOARD_PAGE = 'HANDLE_REMOVING_ITEM_IN_PINBOARD_PAGE';

export const PERFORM_FETCH_PINBOARD_RELATED_DATA = 'PERFORM_FETCH_PINBOARD_RELATED_DATA';

export const PINBOARD_PAGE_REDIRECT = 'PINBOARD_PAGE_REDIRECT';
export const PINBOARD_PAGE_INITIAL_LOADING = 'PINBOARD_PAGE_INITIAL_LOADING';
export const PINBOARD_PAGE_FOCUS_ITEM = 'PINBOARD_PAGE_FOCUS_ITEM';

export const UPDATE_PINBOARD_INFO = 'UPDATE_PINBOARD_INFO';
export const UPDATE_PINBOARD_INFO_STATE = 'UPDATE_PINBOARD_INFO_STATE';

export const OPEN_VIDEO_MODAL = 'OPEN_VIDEO_MODAL';
export const CLOSE_VIDEO_MODAL = 'CLOSE_VIDEO_MODAL';

export const VIDEO_INFO_REQUEST_START = 'VIDEO_INFO_REQUEST_START';
export const VIDEO_INFO_REQUEST_SUCCESS = 'VIDEO_INFO_REQUEST_SUCCESS';
export const VIDEO_INFO_REQUEST_FAILURE = 'VIDEO_INFO_REQUEST_FAILURE';

export const CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE = 'CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE';

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
  LIGHT_COLOR: greyColor,
};

export const RECENT_CONTENT_TYPE = 'RECENT';
export const MORE_BUTTON = 'MORE_BUTTON';
export const SEARCH_BOX = 'SEARCH_BOX';

export const SEARCH_CATEGORIES = [
  'SEARCH-TERMS', 'DATE > CR', 'DATE > TRR', 'DATE > OFFICERS', 'OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD',
  'UNIT > OFFICERS', 'CR', 'INVESTIGATOR > CR', 'TRR', 'BEAT', 'POLICE-DISTRICT', 'WARD', 'SCHOOL-GROUND', 'UNIT',
  'RANK', 'ZIP-CODE',
];

export const SEARCH_CATEGORY_PREFIXES = SEARCH_CATEGORIES.reduce((result, searchCategory) => {
  return { ...result, [searchCategory]: kebabCase(searchCategory) };
}, {});

export const SEARCH_QUERY_PREFIX_REGEX = new RegExp(`^(${Object.values(SEARCH_CATEGORY_PREFIXES).join('|')}):`);

export const OFFICER_EDIT_MODE = 'OFFICER_EDIT_MODE';
export const OFFICER_EDIT_TYPES = new Enum(['TRIANGLE', 'SCALE', 'NO_DATA_RADAR_CHART']);

export const CR_EDIT_MODE = 'CR_EDIT_MODE';
export const CR_EDIT_TYPES = new Enum([
  'NO_ATTACHMENT_TEXT', 'DOCUMENT_REQUEST_INSTRUCTION', 'NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION',
]);

export const TRR_EDIT_MODE = 'TRR_EDIT_MODE';
export const TRR_EDIT_TYPES = new Enum(['NO_ATTACHMENT_TEXT', 'DOCUMENT_REQUEST_INSTRUCTION']);

export const PINBOARD_EDIT_MODE = 'PINBOARD_EDIT_MODE';
export const PINBOARD_EDIT_TYPES = new Enum(['EMPTY_PINBOARD_TITLE', 'EMPTY_PINBOARD_DESCRIPTION']);

export const TURN_ON_LOGO_EDIT_MODE = 'TURN_ON_LOGO_EDIT_MODE';
export const TURN_OFF_LOGO_EDIT_MODE = 'TURN_OFF_LOGO_EDIT_MODE';

export const TURN_ON_DEMO_VIDEO_EDIT_MODE = 'TURN_ON_DEMO_VIDEO_EDIT_MODE';
export const TURN_OFF_DEMO_VIDEO_EDIT_MODE = 'TURN_OFF_DEMO_VIDEO_EDIT_MODE';

export const TURN_ON_CAROUSEL_HEADER_EDIT_MODE = 'TURN_ON_CAROUSEL_HEADER_EDIT_MODE';
export const TURN_OFF_CAROUSEL_HEADER_EDIT_MODE = 'TURN_OFF_CAROUSEL_HEADER_EDIT_MODE';

export const TURN_ON_DOCUMENT_TITLE_EDIT_MODE = 'TURN_ON_DOCUMENT_TITLE_EDIT_MODE';
export const TURN_OFF_DOCUMENT_TITLE_EDIT_MODE = 'TURN_OFF_DOCUMENT_TITLE_EDIT_MODE';
export const TURN_ON_TAGS_EDIT_MODE = 'TURN_ON_TAGS_EDIT_MODE';
export const TURN_OFF_TAGS_EDIT_MODE = 'TURN_OFF_TAGS_EDIT_MODE';
export const TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE = 'TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE';
export const TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE = 'TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE';

export const CAROUSEL_TYPES = new Enum(['COMPLAINT', 'ACTIVITY', 'ALLEGATION', 'DOCUMENT']);

export const UPDATE_CMS_PAGE_REQUEST_START = 'UPDATE_CMS_PAGE_REQUEST_START';
export const UPDATE_CMS_PAGE_REQUEST_SUCCESS = 'UPDATE_CMS_PAGE_REQUEST_SUCCESS';
export const UPDATE_CMS_PAGE_REQUEST_FAILURE = 'UPDATE_CMS_PAGE_REQUEST_FAILURE';
export const CMS_PAGE_REQUEST_START = 'CMS_PAGE_REQUEST_START';
export const CMS_PAGE_REQUEST_SUCCESS = 'CMS_PAGE_REQUEST_SUCCESS';
export const CMS_PAGE_REQUEST_FAILURE = 'CMS_PAGE_REQUEST_FAILURE';

export const UPDATE_DOCUMENT_PAGE_REQUEST_START = 'UPDATE_DOCUMENT_PAGE_REQUEST_START';
export const UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS = 'UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS';
export const UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE = 'UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE';

export const CLUSTER_GEO_REQUEST_START = 'CLUSTER_GEO_REQUEST_START';
export const CLUSTER_GEO_REQUEST_SUCCESS = 'CLUSTER_GEO_REQUEST_SUCCESS';
export const CLUSTER_GEO_REQUEST_FAILURE = 'CLUSTER_GEO_REQUEST_FAILURE';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const LANDING_PAGE_ID = 'landing-page';
export const OFFICER_PAGE_ID = 'officer-page';
export const CR_PAGE_ID = 'cr-page';
export const TRR_PAGE_ID = 'trr-page';
export const PINBOARD_PAGE_ID = 'pinboard-page';

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

export const DOCUMENTS_SEARCH_ITEMS = {
  MONTH_SEPARATOR: 'MONTH_SEPARATOR',
  DOCUMENT: 'DOCUMENT',
};

export const PINBOARDS_SEARCH_ITEMS = {
  MONTH_SEPARATOR: 'MONTH_SEPARATOR',
  PINBOARD: 'PINBOARD',
};

export const NEW_TIMELINE_FILTERS = {
  ALL: {
    label: 'All',
    kind: [NEW_TIMELINE_ITEMS.CR, NEW_TIMELINE_ITEMS.FORCE, NEW_TIMELINE_ITEMS.AWARD],
  },
  CRS: {
    label: 'Complaints',
    kind: [NEW_TIMELINE_ITEMS.CR],
  },
  SUSTAINED: {
    label: 'Sustained',
    kind: [NEW_TIMELINE_ITEMS.CR],
    finding: ['Sustained'],
  },
  FORCE: {
    label: 'Use Of Force',
    kind: [NEW_TIMELINE_ITEMS.FORCE],
  },
  AWARDS: {
    label: 'Awards',
    kind: [NEW_TIMELINE_ITEMS.AWARD],
  },
  RANK_UNIT_CHANGES: {
    label: 'Rank/Unit Changes',
    kind: [],
  },
};

export const DISTANCE_OPTIONS = {
  '0.5mi': '0.5 MILES',
  '1mi': '1 MILES',
  '2.5mi': '2.5 MILES',
  '5mi': '5 MILES',
  '10mi': '10 MILES',
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
  ATTACHMENTS: 'DOCUMENTS',
};

export const OFFICER_PAGE_TAB_ROUTE = {
  documents: OFFICER_PAGE_TAB_NAMES.ATTACHMENTS,
  map: OFFICER_PAGE_TAB_NAMES.MAP,
  coaccusals: OFFICER_PAGE_TAB_NAMES.COACCUSALS,
  // No route for timeline because it is the default tab
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
  PAIR: 'coaccused_pair',
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
    NO_DATA_RADAR_CHART: 'noDataRadarChart',
  },
  COMPLAINT: {
    CATEGORY: 'category',
    ACCUSED_OFFICER: 'accusedOfficer',
  },
  TRR: {
    FORCE_CATEGORY: 'forceCategory',
    TYPES_OF_FORCE: 'typeOfForce',
  },
};

export const CALL_TO_ACTION_TYPES = {
  VIEW_ALL: 'view_all',
  LINK: 'link',
};

export const FULL_MONTH_DATE_FORMAT = 'MMMM D, YYYY';

export const DOCUMENT_SOURCE_MAP = {
  PORTAL_COPA: 'https://www.chicagocopa.org/',
  SUMMARY_REPORTS_COPA: 'https://www.chicagocopa.org/',
  DOCUMENTCLOUD: 'https://www.documentcloud.org/',
  PORTAL_COPA_DOCUMENTCLOUD: 'https://www.chicagocopa.org/',
  SUMMARY_REPORTS_COPA_DOCUMENTCLOUD: 'https://www.chicagocopa.org/',
};

export const SHAREABLE_HEADER_BUTTON_TYPE = {
  NONE: 'none',
  MENU: 'menu',
  LINK: 'link',
};

export const OFFICER_DOWNLOAD_KINDS = {
  WITHOUT_DOCS: 'without_docs',
  WITH_DOCS: 'with_docs',
};

export const OFFICER_DOWNLOAD_TRACKING_ACTIONS = {
  DOWNLOAD: 'download',
  REQUEST_DOWNLOAD_URLS: 'request_download_urls',
};

export const PINBOARD_HEX_ID_LENGTH = 8;

export const PINBOARD_PAGE_TAB_NAMES = {
  NETWORK: 'NETWORK',
  GEOGRAPHIC: 'GEOGRAPHIC',
};

export const CHANGE_PINBOARD_TAB = 'CHANGE_PINBOARD_TAB';

export const UNDO_CARD_VISIBLE_TIME = 4000;

export const CHANGE_NETWORK_TAB = 'CHANGE_NETWORK_TAB';

export const NETWORK_TAB_NAMES = {
  OFFICERS: 'Officers',
  TIMELINE: 'Timeline',
};

export const SOCIAL_GRAPH_MAIN_TAB_NAMES = {
  NETWORK: 'NETWORK',
  GEOGRAPHIC: 'GEOGRAPHIC',
};

export const CHANGE_SOCIAL_GRAPH_MAIN_TAB = 'CHANGE_SOCIAL_GRAPH_MAIN_TAB';

export const UPDATE_SELECTED_OFFICER_ID = 'UPDATE_SELECTED_OFFICER_ID';

export const UPDATE_GEOGRAPHIC_CRID = 'UPDATE_GEOGRAPHIC_CRID';

export const UPDATE_GEOGRAPHIC_TRR_ID = 'UPDATE_GEOGRAPHIC_TRR_ID';

export const UNDO_CARD_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const UPDATE_PINBOARD_TIMELINE_IDX = 'UPDATE_PINBOARD_TIMELINE_IDX';

export const UPDATE_PINBOARD_REFRESH_INTERVAL_ID = 'UPDATE_PINBOARD_REFRESH_INTERVAL_ID';

export const UPDATE_SOCIAL_GRAPH_TIMELINE_IDX = 'UPDATE_SOCIAL_GRAPH_TIMELINE_IDX';

export const UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB = 'UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB';

export const UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID = 'UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID';

export const UPDATE_SOCIAL_GRAPH_SELECTED_EDGE = 'UPDATE_SOCIAL_GRAPH_SELECTED_EDGE';

export const UPDATE_SOCIAL_GRAPH_SELECTED_CRID = 'UPDATE_SOCIAL_GRAPH_SELECTED_CRID';

export const NETWORK_PREVIEW_PANE = {
  OFFICER: 'OFFICER',
  EDGE_COACCUSALS: 'EDGE-COACCUSALS',
  CR: 'CR',
};

export const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'DATE > CR': 'crids',
  'INVESTIGATOR > CR': 'crids',
  'OFFICER': 'officer_ids',
  'UNIT > OFFICERS': 'officer_ids',
  'DATE > OFFICERS': 'officer_ids',
  'TRR': 'trr_ids',
  'DATE > TRR': 'trr_ids',
};

export const PINBOARD_ITEM_REMOVE_MODE = {
  DEFAULT: 'ALL',
  API_ONLY: 'API_ONLY',
  STATE_ONLY: 'STATE_ONLY',
};

export const MODAL_VIDEO_INFO = {
  CHANNEL: 'vimeo',
  VIDEO_ID: '285002059',
};

export const SEARCH_SAVE_TO_RECENT = 'SEARCH_SAVE_TO_RECENT';

export const FETCH_RECENT_SEARCH_ITEMS_START = 'FETCH_RECENT_SEARCH_ITEMS_START';
export const FETCH_RECENT_SEARCH_ITEMS_SUCCESS = 'FETCH_RECENT_SEARCH_ITEMS_SUCCESS';
export const FETCH_RECENT_SEARCH_ITEMS_FAILURE = 'FETCH_RECENT_SEARCH_ITEMS_FAILURE';
export const FETCHED_EMPTY_RECENT_SEARCH_ITEMS = 'FETCHED_EMPTY_RECENT_SEARCH_ITEMS';

export const RECENT_SEARCH_COMPONENT_TYPE_MAPPING = {
  'DATE > OFFICERS': 'OFFICER',
  'UNIT > OFFICERS': 'OFFICER',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'DATE > TRR': 'TRR',
};

export const PINNED_ITEM_TYPES = {
  'CR': 'CR',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'OFFICER': 'OFFICER',
  'UNIT > OFFICERS': 'OFFICER',
  'DATE > OFFICERS': 'OFFICER',
  'TRR': 'TRR',
  'DATE > TRR': 'TRR',
};

export const HEADER_TOP_BAR_HEIGHT = 80;
