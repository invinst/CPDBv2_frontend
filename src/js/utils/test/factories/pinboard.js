import { Factory } from 'rosie';


/* istanbul ignore next */
export default Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('trr_ids', () => [])
  .attr('description', '')
  .attr('crItems', () => [])
  .attr('officerItems', () => [])
  .attr('trrItems', () => [])
  .attr('isPinboardRestored', () => false);
