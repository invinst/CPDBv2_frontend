import { Factory } from 'rosie';
import { date, random, name, helpers, address } from 'faker';
import moment from 'moment';


/* istanbul ignore next */
const dateGenerator = () => (moment(date.past()).format('YYYY-MM-DD'));
/* istanbul ignore next */
const percentileGenerator = () => (random.number({ min: 10, max: 1000 }) / 10.0);


/* istanbul ignore next */
export const RawTRROfficerFactory = Factory.define('RawTRROfficerFactory')
  .sequence('id')
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('appointed_date', dateGenerator)
  .attr('birth_year', random.number({ min: 1950, max: 1990 }))
  .attr('resignation_date', dateGenerator)
  .attr('age', () => random.number())
  .attr('sustained_count', () => random.number())
  .attr('unit', {
    'unit_name': '001',
    'description': 'Targeted Response Unit'
  })
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);


/* istanbul ignore next */
export const RawTRRFactory = Factory.define('RawTRRFactory')
  .sequence('id')
  .attr('officer', () => RawTRROfficerFactory.build())
  .attr('officer_in_uniform', () => random.boolean())
  .attr('officer_assigned_beat', '4682E')
  .attr('officer_on_duty', ()=> random.boolean())
  .attr('subject_race', () => helpers.shuffle(
      ['White', 'Black', 'Hispanic', 'Asian/Pacific', 'Unknown', 'Native American/Alaskan Native']
    )[0]
  )
  .attr('subject_race', () => helpers.shuffle(['Male', 'Female'])[0])
  .attr('force_category', () => helpers.shuffle(['Taser', 'Firearm', 'Other'])[0])
  .attr('date_of_incident', dateGenerator)
  .attr('location_type', 'Street')
  .attr('address', address.streetAddress)
  .attr('beat', 331)
  .attr('forceTypes', [
    'Imminent Threat Of Battery',
    'Pulled Away',
    'Verbal Commands',
    'Other (Specify)'
  ]);
