import { Factory } from 'rosie';

import { internet, name } from 'faker';

export const OfficerCardFactory = Factory.define('OfficerCardFactory')
  .sequence('id')
  .attr('fullName', name.findName)
  .attr('visualTokenBackgroundColor', internet.color);

export const RawOfficerCardFactory = Factory.define('RawOfficerCardFactory')
  .sequence('id')
  .attr('full_name', name.findName)
  .attr('visual_token_background_color', internet.color);
