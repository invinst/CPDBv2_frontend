import { Factory } from 'rosie';


/* istanbul ignore next */
export default Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('description', '')
  .attr('ownedByCurrentUser', false);
