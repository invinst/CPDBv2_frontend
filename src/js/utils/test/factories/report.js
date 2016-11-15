import { Factory } from 'rosie';

import {
  PlainTextFieldFactory, MultilineTextFieldFactory, StringFieldFactory,
  DateFieldFactory, RichTextFieldFactory
} from 'utils/test/factories/field';


export default Factory.define('report')
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

export const CuratedReportFactory = Factory.define('curatedReport')
  .extend('report')
  .attr('fields',
    ['title', 'excerpt', 'publication', 'publishDate', 'author', 'articleLink'],
    (title, excerpt, publication, publishDate, author, articleLink) => ({
      'title': PlainTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
      'excerpt': MultilineTextFieldFactory.build({ name: 'excerpt' }, { blockTexts: [excerpt] }),
      'publication': StringFieldFactory.build({ name: 'publication', value: publication }),
      'publish_date': DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
      'author': StringFieldFactory.build({ name: 'author', value: author }),
      'article_link': RichTextFieldFactory.build({ name: 'article_link' }, { blockTexts: [articleLink] })
    }));

export const SimpleReportFactory = Factory.define('simpleReportFactory')
  .sequence('id')
  .attr('title', '')
  .attr('excerpt', '')
  .attr('publication', '')
  .attr('publishDate', '')
  .attr('author', '')
  .attr('articleLink', '');
