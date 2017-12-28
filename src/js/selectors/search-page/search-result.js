import { compact, get } from 'lodash';


const searchResultTransformMap = {
  OFFICER: ({ payload }) => {
    const currentYear = (new Date()).getFullYear();
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


export const searchResultItemTransform = (item) => {
  const transform = get(searchResultTransformMap, item.type, () => {});

  return {
    type: item.type,
    id: item.id,
    text: get(item, 'payload.result_text'),
    to: get(item, 'payload.to'),
    url: get(item, 'payload.url'),
    tags: get(item, 'payload.tags', []),
    uniqueKey: `${item.type}-${item.id}`,
    ...transform(item)
  };
};
