import { Factory } from 'rosie';
import { random, helpers, lorem } from 'faker';

import { dateGenerator } from '../utils';
import RawOfficer from '../pinboard-page/raw-officer';


export const RawAllegationFactory = Factory.define('RawRelevantDocumentFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('category', lorem.words)
  .attr('incident_date', dateGenerator)
  .attr('officers', () => RawOfficer.buildList(random.number({ min: 0, max: 10 })));

/* istanbul ignore next */
export default Factory.define('RawRelevantDocumentFactory')
  .sequence('id')
  .attr('preview_image_url', 'http://via.placeholder.com/121x157')
  .attr('url', 'lvh.me')
  .attr('allegation', () => RawAllegationFactory.build());
