import { Factory } from 'rosie';

import { date, lorem, helpers } from 'faker';

export const ComplaintSummaryFactory = Factory.define('ComplaintSummaryFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('summary', lorem.paragraph)
  .attr('closedDate', date.past)
  .attr('category', () => {
    return helpers.shuffle(['Use of Force', 'Illegal Search', 'Domestic', 'Unknown'])[0];
  });
