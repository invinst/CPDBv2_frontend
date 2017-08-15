export function getOfficerId(url) {
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

export function hasOfficerIdChanged(action, officerId) {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    return !isNaN(nextOfficerId) && (officerId !== nextOfficerId);
  }
  return false;
}
