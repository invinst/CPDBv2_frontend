import draftJs from 'draft-js';
import moment from 'moment';
import { stub } from 'sinon';

import { reportSelector } from 'selectors/bottom-sheet/report';
import { BottomSheetContentType } from 'utils/constants';
import ReportFactory from 'utils/test/factories/report';
import { StringFieldFactory, DateFieldFactory, RichTextFieldFactory, FieldFactory } from 'utils/test/factories/field';


describe('report selector', function () {
  it('should return existing report', function () {
    const title = 'a';
    const publication = 'b';
    const publishDate = '2016-10-03';
    const author = 'c';
    const excerpt = 'd';
    const articleLink = 'e';
    const officers = [1];
    const state = {
      reports: {
        1: ReportFactory.build({}, { title, publication, publishDate, author, excerpt, articleLink, officers })
      }
    };
    const props = { type: BottomSheetContentType.REPORT, id: 1 };
    reportSelector(state, props).should.eql({
      id: 1,
      fields: {
        'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
        'publication': StringFieldFactory.build({ name: 'publication', value: publication }),
        'publish_date': DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
        'author': StringFieldFactory.build({ name: 'author', value: author }),
        'excerpt': RichTextFieldFactory.build(
          { name: 'excerpt' }, { blockTexts: [excerpt] }
        ),
        'article_link': RichTextFieldFactory.build(
          { name: 'article_link' }, { blockTexts: [articleLink] }
        ),
        'officers': FieldFactory.build(
          { name: 'officers', type: 'officers_list', value: officers }
        )
      }
    });
  });

  it('should return empty report when id is "new"', function () {
    const state = { reports: {} };
    const props = { type: BottomSheetContentType.REPORT, id: 'new' };
    const stubGenKey = stub(draftJs, 'genKey');
    stubGenKey.returns('abc12');
    reportSelector(state, props).should.eql({ id: null, fields: {
      'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [''] }),
      'publication': StringFieldFactory.build({ name: 'publication', value: '' }),
      'publish_date': DateFieldFactory.build(
        { name: 'publish_date', value: moment().format('YYYY-MM-DD') }
      ),
      'author': StringFieldFactory.build({ name: 'author', value: '' }),
      'excerpt': RichTextFieldFactory.build(
        { name: 'excerpt' }, { blockTexts: [''] }
      ),
      'article_link': RichTextFieldFactory.build(
        { name: 'article_link' }, { blockTexts: [''] }
      ),
      'officers': FieldFactory.build({ name: 'officers', type: 'officers_list', value: [] })
    } });
    stubGenKey.restore();
  });
});
