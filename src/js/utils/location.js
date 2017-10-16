export function getOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

export function getCRID(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*complaint?\/(\d+).*/, '$1'));
}

export function hasOfficerIdChanged(action, officerId) {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    return !isNaN(nextOfficerId) && (officerId !== nextOfficerId);
  }
  return false;
}

export function isSameOfficerPath(path1, path2) {
  const prevOfficerId = getOfficerId(path1);
  const officerId = getOfficerId(path2);
  return !isNaN(prevOfficerId) && !isNaN(officerId) && prevOfficerId === officerId;
}

export function isSameCR(path1, path2) {
  const prevCRID = getCRID(path1);
  const CRID = getCRID(path2);
  return !isNaN(prevCRID) && !isNaN(CRID) && prevCRID === CRID;
}
