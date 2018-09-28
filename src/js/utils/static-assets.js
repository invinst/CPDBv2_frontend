import config from 'config';


export function imgUrl(path) {
  if (config.appEnv === 'dev') {
    return `/src/img/${path}`;
  } else {
    return `/dist/img/${path}`;
  }
}

export function mediaUrl(path) {
  if (config.appEnv === 'dev') {
    return `http://localhost:8000${path}`;
  } else {
    return path;
  }
}

export const clusterGeoJSONPath = `${config.heatMapContainer}cluster.geojson`;
export const communityGeoJSONPath = `${config.heatMapContainer}community.geojson`;
