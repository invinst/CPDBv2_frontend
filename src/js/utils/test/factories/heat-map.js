import { Factory } from 'rosie';
import { random, finance, lorem, name } from 'faker';


export const CitySummaryFactory = new Factory()
  .attr('allegation_count', random.number)
  .attr('discipline_count', random.number)
  .attr('most_common_complaints', () => []);

export const mostComplaintOfficerFactory = new Factory()
  .attr('complaintsCount', random.number)
  .attr('fullName', name.findName)
  .sequence('id');

export const raceCountFactory = new Factory()
  .attr('race', lorem.word)
  .attr('count', random.number);

export const communityFactory = new Factory()
  .attr('allegationCount', random.number)
  .attr('disciplineCount', random.number)
  .sequence('id')
  .attr('medianIncome', () => `$${finance.amount()}`)
  .attr('name', lorem.word)
  .attr('population', () => random.number().toLocaleString())
  .attr('raceCount', () => [
    raceCountFactory.build({ race: 'White' }),
    raceCountFactory.build({ race: 'Black' })
  ])
  .attr('mostComplaintsOfficers', () => mostComplaintOfficerFactory.buildList(3));

export const rawComplaintOfficerFactory = new Factory()
  .attr('complaints_count', random.number)
  .attr('full_name', name.findName)
  .sequence('id');

/* istanbul ignore next */
export const rawCommunityFactory = new Factory()
  .attr('allegation_count', random.number)
  .attr('discipline_count', random.number)
  .sequence('id')
  .attr('median_income', () => `$${finance.amount()}`)
  .attr('name', lorem.word)
  .attr('population', () => random.number().toLocaleString())
  .attr('race_count', () => [
    raceCountFactory.build({ race: 'White' }),
    raceCountFactory.build({ race: 'Black' })
  ])
  .attr('most_complaints_officers', () => rawComplaintOfficerFactory.buildList(3));
