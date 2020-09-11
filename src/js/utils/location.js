export function getOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

export function getTRRId(url) {
  if (!url) {
    return NaN;
  }
  return parseInt(url.replace(/.*trr?\/(\d+).*/, '$1'));
}

export function getCRID(url) {
  const crPattern = /.*complaint\/(\w+).*/;
  if (url === undefined || !url.match(crPattern)) {
    return null;
  }
  return url.replace(crPattern, '$1');
}

export function getLawsuitCaseNo(url) {
  const lawsuitPattern = /.*lawsuit\/([a-zA-Z0-9-]+).*/;
  if (url === undefined || !url.match(lawsuitPattern)) {
    return null;
  }
  return url.replace(lawsuitPattern, '$1');
}

export function getDocumentId(url) {
  if (!url) {
    return NaN;
  }

  return parseInt(url.replace(/.*document?\/(\d+).*/, '$1'));
}

export function getUnitName(url) {
  if (url === undefined) {
    return null;
  }
  return url.replace(/.*unit\/([^/]+).*/, '$1');
}

export function getComplaintOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*complaint\/\w+\/(\d+).*/, '$1'));
}

export function getOfficerActiveTab(url) {
  const pattern = /.*officer\/\d+\/([a-z-]*)/;
  if (url.search(pattern) === -1) {
    return null;
  }
  return url.match(pattern)[1];
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

export function getDocDedupCRID(url) {
  const crPattern = /.*documents\/crid\/(\w+).*/;
  if (url === undefined || !url.match(crPattern)) {
    return null;
  }
  return url.replace(crPattern, '$1');
}

export function getPinboardID(url) {
  const pinboardPattern = /.*pinboard\/([a-fA-F0-9]+).*/;
  if (url === undefined || !url.match(pinboardPattern)) {
    return null;
  }
  return url.replace(pinboardPattern, '$1');
}
