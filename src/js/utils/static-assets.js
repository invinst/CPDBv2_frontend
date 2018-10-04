import config from 'config';


export function imgUrl(path) {
  if (config.appEnv === 'dev') {
    return `/src/img/${path}`;
  } else {
    return `/dist/img/${path}`;
  }
}

export const clusterGeoJSONPath = `${config.heatMapContainer}cluster.geojson`;
export const communityGeoJSONPath = `${config.heatMapContainer}community.geojson`;
