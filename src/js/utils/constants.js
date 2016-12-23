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

export const V1_URL = 'https://beta.cpdb.co';

export const ALPHA_NUMBERIC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                               'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                               'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                               'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
