import { createSelector } from 'reselect';
import { map } from 'lodash';

import {
  getField, createFieldWithEmptyEditorState, createEmptyStringField,
  createEmptyDateField, createEmptyOfficersField
} from 'utils/draft';


const getOfficerSearchResult = state => state.bottomSheet.officersAutoSuggest.officers;
const getReports = state => state.reports;
const getId = (state, props) => props.id;

export const reportSelector = createSelector(
  getReports,
  getId,
  (reports, id) => {
    const report = reports[parseInt(id)];
    return {
      id: id !== 'new' ? id : null,
      fields: (
        id === 'new' ?
        {
          'title': createFieldWithEmptyEditorState('title', 'rich_text'),
          'publication': createEmptyStringField('publication'),
          'publish_date': createEmptyDateField('publish_date'),
          'author': createEmptyStringField('author'),
          'excerpt': createFieldWithEmptyEditorState('excerpt', 'rich_text'),
          'article_link': createFieldWithEmptyEditorState('article_link', 'rich_text'),
          'officers': createEmptyOfficersField()
        } :
          report ?
          {
            'title': getField(report.fields, 'title'),
            'publication': getField(report.fields, 'publication'),
            'publish_date': getField(report.fields, 'publish_date'),
            'author': getField(report.fields, 'author'),
            'excerpt': getField(report.fields, 'excerpt'),
            'article_link': getField(report.fields, 'article_link'),
            'officers': getField(report.fields, 'officers')
          } :
          null
      )
    };
  }
);

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


export const officerSearchResultSelector = createSelector(
  getOfficerSearchResult,
  officersToCamelCase
);
