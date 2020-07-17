import { RelatedComplaintFactory } from '../../../src/js/utils/test/factories/complaint';

export const relatedComplaintsData = ({ match, nextOffset=20, distance }) => {
  const firstPaginatedResult = [RelatedComplaintFactory.build({
    'crid': '123456',
    'incident_date': '2000-01-01',
  })].concat(RelatedComplaintFactory.buildList(19));
  return {
    count: 100,
    next: (
      `/api/v2/cr/1000000/related-complaints/?match=${ match }&distance=${ distance }&offset=${ nextOffset }`
    ),
    previous: null,
    results: nextOffset === 20 ? firstPaginatedResult : RelatedComplaintFactory.buildList(20),
  };
};
