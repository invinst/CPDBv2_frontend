import { Factory } from 'rosie';

import { internet, name, random } from 'faker';

export const OfficerCardFactory = Factory.define('OfficerCardFactory')
  .sequence('id')
  .attr('fullName', name.findName)
  .attr('complaintCount', random.number)
  .attr('visualTokenBackgroundColor', internet.color)
  .attr('complaintPercentile', () => (random.number({ min: 10, max: 1000 }) / 10.0));

export const RawOfficerCardFactory = Factory.define('RawOfficerCardFactory')
  .sequence('id')
  .attr('full_name', name.findName)
  .attr('complaint_count', random.number)
  .attr('visual_token_background_color', internet.color)
  .attr('complaint_percentile', () => (random.number({ min: 10, max: 1000 }) / 10.0));
