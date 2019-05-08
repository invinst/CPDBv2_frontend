import { get, kebabCase, map } from 'lodash';

import { getDemographicString } from 'utils/victims';
import { extractPercentile } from './percentile';


export const crMapMarkersTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.crid,
  category: geographicDatum.category,
  victims: geographicDatum.victims,
  coaccused: geographicDatum['coaccused_count'],
});

export const trrMapMarkerTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.trr_id.toString(),
  category: geographicDatum['firearm_used'] ? 'Firearm' : geographicDatum.taser ? 'Taser' : 'Use of Force Report',
});

const accusedTransform = coaccused => {
  const percentile = extractPercentile(coaccused.percentile);
  return {
    id: coaccused.id,
    name: coaccused['full_name'],
    url: `/officer/${coaccused.id}/${kebabCase(coaccused['full_name'])}/`,
    count: coaccused['allegation_count'],
    radarAxes: percentile.items,
    radarColor: percentile.visualTokenBackground,
  };
};

export const geographicAllegationTransform = geographicDatum => ({
  category: geographicDatum.category,
  subCategory: geographicDatum.subcategory,
  incidentDate: geographicDatum.date,
  address: geographicDatum.address,
  victims: map(geographicDatum.victims, victim => getDemographicString(victim)),
  coaccused: map(geographicDatum['coaccused'], coaccused => accusedTransform(coaccused)),
  to: geographicDatum.to,
});
