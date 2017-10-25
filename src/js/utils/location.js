export function getOfficerId(url) {
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

export function isRedirectingToOfficerTimelinePage(action) {
  const regex = /^\/officer\/\d+\/timeline\/$/;
  return (
    action.type === '@@router/LOCATION_CHANGE' &&
    !!action.payload.pathname.match(regex)
  );
}

export function hasOfficerIdChanged(action, officerId) {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    return !isNaN(nextOfficerId) && (officerId !== nextOfficerId);
  }
  return false;
}

export function getCrId(url) {
  return parseInt(url.replace(/.*complaint?\/(\d+).*/, '$1'));
}

export function serializeFilterParams(obj, startWith = '') {
  const urlParams = Object.entries(obj).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
  return urlParams ? startWith + urlParams : '';
}
