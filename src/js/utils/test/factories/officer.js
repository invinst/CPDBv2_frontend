import { Factory } from 'rosie';
import { name, random, internet, lorem } from 'faker';


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
  .attr('complaintCount', () => random.number())
  .attr('sustainedCount', () => random.number())
  .attr('finding', () => lorem.word())
  .attr('outcome', () => lorem.word())
  .attr('recommendedOutcome', () => lorem.word())
  .attr('complaintPercentile', 99)
  .attr('birthYear', 1970)
  .attr('race', 'white')
  .attr('percentile', () => ({
    officerId: random.number(),
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: Math.random() * 100 },
      { axis: 'Officer Allegations', value: Math.random() * 100 },
      { axis: 'Civilian Allegations', value: Math.random() * 100 }
    ],
    visualTokenBackground: '#f5f4f4',
    textColor: '#231F20',
  }));
