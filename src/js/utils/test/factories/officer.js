import { Factory } from 'rosie';
import { name, random, lorem } from 'faker';


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
      { axis: 'Civilian Allegations', value: Math.random() * 100 },
    ],
    visualTokenBackground: '#f5f4f4',
    textColor: '#231F20',
  }));
