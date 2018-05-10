import { Factory } from 'rosie';
import { name, random, internet } from 'faker';


/* istanbul ignore next */
export default Factory.define('officer')
  .sequence('id')
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('allegation_count', () => random.number())
  .attr('v1_url', () => internet.url());

export const CoaccusedFactory = Factory.define('coaccused')
  .sequence('id')
  .attr('rank', 'Officer')
  .attr('fullname', () => `${name.firstName()} ${name.lastName}`)
  .attr('allegationCount', () => random.number())
  .attr('sustainedCount', () => random.number())
  .attr('allegationPercentile', 99)
  .attr('age', 40)
  .attr('race', 'white')
  .attr('radarAxes', () => [
    { axis: 'trr', value: Math.random() * 100 },
    { axis: 'internal', value: Math.random() * 100 },
    { axis: 'civilian', value: Math.random() * 100 }
  ])
  .attr('radarColor', {
    backgroundColor: '#700404',
    textColor: '#f5f4f4'
  });
