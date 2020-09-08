/* istanbul ignore next */
import { Factory } from 'rosie';
import { helpers, lorem } from 'faker';
import { dateGenerator } from './utils';

export const RawTopLawsuitFactory = Factory.define('RawTopLawsuitFactory')
  .attr('case_no', () => (helpers.replaceSymbolWithNumber('##-L-####')))
  .attr('summary', lorem.paragraph)
  .attr('incident_date', dateGenerator)
  .attr('primary_cause', () => {
    return [helpers.shuffle([
      'Excessive Force/Serious',
      'Extended Detention',
      'Failure To Provide Medical Care',
      'Unknown',
    ])[0]];
  });

export const TopLawsuitFactory = Factory.define('TopLawsuitFactory')
  .attr('caseNo', () => (helpers.replaceSymbolWithNumber('##-L-####')))
  .attr('summary', lorem.paragraph)
  .attr('incidentDate', dateGenerator)
  .attr('primaryCause', () => {
    return [helpers.shuffle([
      'Excessive Force/Serious',
      'Extended Detention',
      'Failure To Provide Medical Care',
      'Unknown',
    ])[0]];
  });
