import { compact, get } from 'lodash';

import { getThisYear } from 'utils/date';
import { getSvgUrl } from 'utils/visual-token';


const previewPaneTypeMap = {
  'OFFICER': (suggestion) => {
    const currentYear = getThisYear();
    const { payload, id, text } = suggestion;
    const visualTokenImg = getSvgUrl(id);
    const data = [
      ['unit', payload.unit],
      ['rank', payload.rank],
      [`${currentYear} salary`, payload.salary],
      ['race', payload.race],
      ['sex', payload.sex]
    ];
    const visualTokenBackgroundColor = payload['visual_token_background_color'];
    return { data, visualTokenBackgroundColor, visualTokenImg, text };
  }
};

export const previewPaneTransform = item =>
  get(previewPaneTypeMap, item.type, () => ({}))(item);


const searchResultTransformMap = {
  OFFICER: ({ payload }) => {
    const currentYear = getThisYear();
    const age = payload['birth_year'] ? `${currentYear - payload['birth_year']} year old` : null;
    const race = payload['race'] === 'Unknown' ? null : payload['race'];
    const sex = payload['sex'] ? payload['sex'] : null;
    const demographicInfo = compact([age, race, sex]).join(', ');
    return {
      demographicInfo,
      complaintCount: payload['allegation_count'],
      sustainedCount: payload['sustained_count']
    };
  },
  CR: ({ payload }) => {
    return {
      subText: `CRID ${payload.crid}, ${payload.outcome}`
    };
  }
};

export const searchResultItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  text: get(item, 'payload.result_text'),
  to: get(item, 'payload.to'),
  url: get(item, 'payload.url'),
  tags: get(item, 'payload.tags', []),
  uniqueKey: `${item.type}-${item.id}`,
  ...get(searchResultTransformMap, item.type, () => {})(item)
});

export const navigationItemTransform = item => ({
  type: item.type,
  id: item.id,
  text: get(item, 'payload.result_text'),
  uniqueKey: get(item, 'uniqueKey', `${item.type}-${item.id}`),
  to: get(item, 'payload.to'),
  url: get(item, 'payload.url'),
});
