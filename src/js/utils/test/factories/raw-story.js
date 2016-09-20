import { Factory } from 'rosie';
import { lorem, internet, date } from 'faker';

import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';


export default new Factory()
  .sequence('id')
  .attr('publication_name', () => (lorem.sentences()))
  .attr('publication_short_name', () => (internet.url()))
  .attr('canonical_url', () => (internet.url()))
  .attr('title', () => (lorem.sentence()))
  .attr('body', () => ([{
    type: 'paragraph', value: lorem.sentences()
  }]))
  .attr('post_date', () => (date.past()))
  .attr('image_url', () => ({
    [DEFAULT_IMAGE_DIMENSION]: internet.url()
  }));
