import config from 'config';


export function imgUrl(path) {
  return `/img/${path}`;
}

export const clusterGeoJSONPath = `${config.heatMapContainer}cluster.geojson`;
export const communityGeoJSONPath = `${config.heatMapContainer}community.geojson`;
