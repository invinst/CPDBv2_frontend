import { Factory } from 'rosie';
import { date, lorem, helpers } from 'faker';
import moment from 'moment';

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
