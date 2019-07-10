import { Factory } from 'rosie';


/* istanbul ignore next */
export default Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('trr_ids', () => [])
  .attr('example_pinboards', () => undefined)
  .attr('description', '')
  .attr('saving', () => false)
  .attr('isPinboardRestored', () => false)
  .attr('needRefreshData', () => false);
