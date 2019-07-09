import { Factory } from 'rosie';
import { random, name } from 'faker';

import { RawOfficerPercentileFactory } from 'utils/test/factories/common';


/* istanbul ignore next */
export default Factory.define('RawRelevantCoaccusalFactory')
  .sequence('id')
  .attr('rank', 'Officer')
  .attr('full_name', () => `${ name.firstName() } ${ name.lastName() }`)
  .attr('coaccusal_count', () => random.number())
  .attr('percentile', () => RawOfficerPercentileFactory.build());
