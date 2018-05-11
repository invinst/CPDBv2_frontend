import * as constants from 'utils/constants';
import { RelatedComplaintFactory } from 'utils/test/factories/complaint';

export default ({ match, nextOffset, distance }) => ({
  count: 100,
  next: `${constants.CR_URL}1000000/related-complaints/?match=${match}&distance=${distance}&offset=${nextOffset || 20}`,
  previous: null,
  results: RelatedComplaintFactory.buildList(20)
});
