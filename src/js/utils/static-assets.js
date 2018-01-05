import config from 'config';


export function imgUrl(path) {
  if (global.DEVELOPMENT) {
    return `/src/img/${path}`;
  } else {
    return `/dist/img/${path}`;
  }
}

export function mediaUrl(path) {
  if (global.DEVELOPMENT) {
    return `http://localhost:8000${path}`;
  } else {
    return path;
  }
}

export const clusterGeoJSONPath = `${config.heatMapContainer}cluster.geojson`;
export const communityGeoJSONPath = `${config.heatMapContainer}community.geojson`;
