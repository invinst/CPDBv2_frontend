import { Factory } from 'rosie';

import { lorem, date, internet } from 'faker';
import moment from 'moment';
import {
  RichTextFieldFactory, StringFieldFactory, DateFieldFactory
} from 'utils/test/factories/field';


export default Factory.define('report')
  .sequence('id')
  .option('title', () => lorem.sentence())
  .option('excerpt', () => lorem.sentence())
  .option('publication', () => lorem.words())
  .option('publishDate', () => moment(date.past()).format('YYYY-MM-DD'))
  .option('author', () => lorem.words())
  .option('articleLink', () => internet.url())
  .attr('fields',
    ['title', 'excerpt', 'publication', 'publishDate', 'author', 'articleLink'],
    (title, excerpt, publication, publishDate, author, articleLink) => [
      RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
      RichTextFieldFactory.build({ name: 'excerpt' }, { blockTexts: [excerpt] }),
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
      'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
      'excerpt': RichTextFieldFactory.build({ name: 'excerpt' }, { blockTexts: [excerpt] }),
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

export const ReportCardFactory = Factory.define('reportCardFactory')
  .sequence('id')
  .attr('title', '')
  .attr('publicationName', '')
  .attr('publishDate', '');
