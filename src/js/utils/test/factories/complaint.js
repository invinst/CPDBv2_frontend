import { Factory } from 'rosie';
import { date, lorem, helpers, address, random, internet, name } from 'faker';
import moment from 'moment';


const dateGenerator = () => (moment(date.past()).format('YYYY-MM-DD'));
const percentileGenerator = () => (random.number({ min: 10, max: 1000 }) / 10.0);


export const RawComplaintSummaryFactory = Factory.define('RawComplaintSummaryFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('summary', lorem.paragraph)
  .attr('incident_date', () => (moment(date.past()).format('YYYY-MM-DD')))
  .attr('category_names', () => {
    return [helpers.shuffle(['Use of Force', 'Illegal Search', 'Domestic', 'Unknown'])[0]];
  });

export const ComplaintSummaryFactory = Factory.define('ComplaintSummaryFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('summary', lorem.paragraph)
  .attr('incidentDate', () => (moment(date.past()).format('YYYY-MM-DD')))
  .attr('categoryNames', () => {
    return [helpers.shuffle(['Use of Force', 'Illegal Search', 'Domestic', 'Unknown'])[0]];
  });

export const CoaccusedFactory = Factory.define('CoaccusedFactory')
  .sequence('id', )
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('allegation_count', () => random.number())
  .attr('sustained_count', () => random.number())
  .attr('age', () => random.number())
  .attr('final_outcome', lorem.word)
  .attr('category', lorem.words)
  .attr('percentile_allegation', percentileGenerator)
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);

const PersonDemographicFactory = Factory.define('PersonDemographicFactory')
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('age', () => random.number());

const InvestigatorFactory = Factory.define('InvestigatorFactory')
  .sequence('officer_id')
  .attr('involved_type', 'investigator')
  .attr('full_name', () => name.firstName())
  .attr('current_rank', () => lorem.word())
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);

export const AttachmentFactory = Factory.define('AttachmentFactory')
  .attr('title', () => lorem.word())
  .attr('url', () => internet.url())
  .attr('preview_image_url', () => internet.url())
  .attr('file_type', 'document');

export const ComplaintFactory = Factory.define('ComplaintFactory')
  .attr('crid', () => String(random.number({ min: 1000000, max: 2000000 })))
  .attr('coaccused', () => CoaccusedFactory.buildList(1))
  .attr('complainants', () => PersonDemographicFactory.buildList(1))
  .attr('victims', () => PersonDemographicFactory.buildList(1))
  .attr('summary', lorem.paragraph)
  .attr('incident_date', dateGenerator)
  .attr('start_date', dateGenerator)
  .attr('end_date', dateGenerator)
  .attr('location', 'Police Building')
  .attr('address', address.streetAddress)
  .attr('beat', '23')
  .attr('involvements', () => InvestigatorFactory.buildList(1))
  .attr('attachments', () => AttachmentFactory.buildList(10));
