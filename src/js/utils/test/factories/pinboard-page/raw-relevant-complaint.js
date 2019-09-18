import { Factory } from 'rosie';
import { random, helpers, lorem } from 'faker';

import { dateGenerator } from 'utils/test/factories/utils';
import RawOfficer from 'utils/test/factories/pinboard-page/raw-officer';
import { RawPointFactory } from 'utils/test/factories/common';

/* istanbul ignore next */
export default Factory.define('RawRelevantDocumentFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('category', lorem.words)
  .attr('incident_date', dateGenerator)
  .attr('point', () => RawPointFactory.build())
  .attr('officers', () => RawOfficer.buildList(random.number({ min: 0, max: 10 })));
