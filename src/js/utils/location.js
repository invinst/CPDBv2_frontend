export function getOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

export function getTRRId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*trr?\/(\d+).*/, '$1'));
}

export function getCRID(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*complaint\/(\d+).*/, '$1'));
}

export function getComplaintOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*complaint\/\d+\/(\d+).*/, '$1'));
}

export function getOfficerActiveTab(url) {
  const pattern = /.*officer\/\d+\/([a-z-]*)/;
  if (url.search(pattern) === -1) {
    return null;
  }
  return url.match(pattern)[1];
}

export function hasOfficerIdChanged(action, officerId) {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    return !isNaN(nextOfficerId) && (officerId !== nextOfficerId);
  }
  return false;
}

export function serializeFilterParams(obj, startWith = '') {
  const urlParams = Object.entries(obj).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
  return urlParams ? startWith + urlParams : '';
}

export const officerPath = (subPath, pathname) => {
  if (subPath) {
    return pathname.replace(/(\d+).*/, `$1/${subPath}/`);
  }
  return pathname.replace(/(\d+).*/, '$1/');
};
