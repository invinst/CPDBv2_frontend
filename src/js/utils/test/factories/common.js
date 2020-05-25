import { Factory } from 'rosie';
import { random } from 'faker';


export const RawPointFactory = Factory.define('RawPointFactory')
  .attr('lon', () => (random.number({ min: -90, max: -80, precision: 0.0001 })))
  .attr('lat', () => (random.number({ min: 40, max: 50, precision: 0.0001 })));
