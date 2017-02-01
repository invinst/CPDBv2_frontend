import { Factory } from 'rosie';
import { lorem, internet } from 'faker';


export default new Factory()
  .attr('contentType', lorem.word)
  .attr('text', lorem.word)
  .attr('url', internet.url);
