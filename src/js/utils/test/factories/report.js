import { Factory } from 'rosie';

import {
  PlainTextFieldFactory, MultilineTextFieldFactory, StringFieldFactory,
  DateFieldFactory, RichTextFieldFactory
} from 'utils/test/factories/field';


export default new Factory()
  .sequence('id')
  .option('title', '')
  .option('excerpt', '')
  .option('publication', '')
  .option('publishDate', '')
  .option('author', '')
  .option('articleLink', '')
  .attr('fields',
    ['title', 'excerpt', 'publication', 'publishDate', 'author', 'articleLink'],
    (title, excerpt, publication, publishDate, author, articleLink) => [
      PlainTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
      MultilineTextFieldFactory.build({ name: 'excerpt' }, { blockTexts: [excerpt] }),
      StringFieldFactory.build({ name: 'publication', value: publication }),
      DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
      StringFieldFactory.build({ name: 'author', value: author }),
      RichTextFieldFactory.build({ name: 'article_link' }, { blockTexts: [articleLink] })
    ]);
