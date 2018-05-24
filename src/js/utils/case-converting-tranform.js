import { map } from 'lodash';

export function officersToCamelCase(officers) {
  return map(officers, officer => ({
    fullName: officer['full_name'],
    gender: officer.gender,
    race: officer.race,
    allegationCount: officer['allegation_count'],
    id: officer['id'],
    v1Url: officer['v1_url']
  }));
}

export function officersToSnakeCase(officers) {
  return map(officers, officer => ({ id: officer.id }));
}
