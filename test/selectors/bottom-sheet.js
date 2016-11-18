import moment from 'moment';
import draftJs from 'draft-js';
import { stub } from 'sinon';
import should from 'should';

import '../setup';
import { contentSelector, reportSelector, faqSelector } from 'selectors/bottom-sheet';
import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import ReportFactory from 'utils/test/factories/report';
import FaqFactory from 'utils/test/factories/faq';
import {
  PlainTextFieldFactory, StringFieldFactory, DateFieldFactory, MultilineTextFieldFactory,
  RichTextFieldFactory
} from 'utils/test/factories/field';


describe('bottomSheet selector', function () {
  const emptyReportFields = {
    'title': PlainTextFieldFactory.build({ name: 'title' }, { blockTexts: [''] }),
    'publication': StringFieldFactory.build({ name: 'publication', value: '' }),
    'publish_date': DateFieldFactory.build(
      { name: 'publish_date', value: moment().format('YYYY-MM-DD') }
    ),
    'author': StringFieldFactory.build({ name: 'author', value: '' }),
    'excerpt': MultilineTextFieldFactory.build(
      { name: 'excerpt' }, { blockTexts: [''] }
    ),
    'article_link': RichTextFieldFactory.build(
      { name: 'article_link' }, { blockTexts: [''] }
    )
  };
  const emptyFaqFields = {
    question: PlainTextFieldFactory.build({ name: 'question' }, { blockTexts: [''] }),
    answer: MultilineTextFieldFactory.build({ name: 'answer' }, { blockTexts: [''] })
  };

  describe('reportSelector', function () {
    it('should return existing report', function () {
      const title = 'a';
      const publication = 'b';
      const publishDate = '2016-10-03';
      const author = 'c';
      const excerpt = 'd';
      const articleLink = 'e';
      const state = {
        reports: [
          ReportFactory.build({ id: 1 }, {
            title, publication, publishDate, author, excerpt, articleLink
          })
        ],
        bottomSheet: {
          content: {
            type: REPORT_TYPE,
            id: 1
          }
        }
      };
      reportSelector(state).should.eql({
        id: 1,
        fields: {
          'title': PlainTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
          'publication': StringFieldFactory.build({ name: 'publication', value: publication }),
          'publish_date': DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
          'author': StringFieldFactory.build({ name: 'author', value: author }),
          'excerpt': MultilineTextFieldFactory.build(
            { name: 'excerpt' }, { blockTexts: [excerpt] }
          ),
          'article_link': RichTextFieldFactory.build(
            { name: 'article_link' }, { blockTexts: [articleLink] }
          )
        }
      });
    });

    it('should return empty report when there isn\'t an id', function () {
      const state = {
        reports: [],
        bottomSheet: {
          content: {
            type: REPORT_TYPE,
            id: null
          }
        }
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      reportSelector(state).should.eql({
        id: null,
        fields: emptyReportFields
      });
      stubGenKey.restore();
    });
  });

  describe('faqSelector', function () {
    it('should return existing faq', function () {
      const question = 'question';
      const answer = 'answer';
      const state = {
        faqs: [
          FaqFactory.build({ id: 1 }, { question, answer })
        ],
        bottomSheet: {
          content: {
            type: FAQ_TYPE,
            id: 1
          }
        }
      };
      faqSelector(state).should.eql({
        id: 1,
        fields: {
          'question': PlainTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
          'answer': MultilineTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
        }
      });
    });

    it('should return empty faq when there isn\'t an id', function () {
      const state = {
        faqs: [],
        bottomSheet: {
          content: {
            type: REPORT_TYPE,
            id: null
          }
        }
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      faqSelector(state).should.eql({
        id: null,
        fields: emptyFaqFields
      });
      stubGenKey.restore();
    });
  });

  describe('contentSelector', function () {
    it('should return null when bottomSheet has no content', function () {
      const state = {
        bottomSheet: {}
      };
      should(contentSelector(state)).be.null();
    });

    it('should return report props if content type is REPORT_TYPE', function () {
      const state = {
        bottomSheet: {
          content: {
            type: REPORT_TYPE,
            id: 1
          }
        },
        reports: []
      };

      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      contentSelector(state).should.eql({
        type: REPORT_TYPE,
        props: {
          id: null,
          fields: emptyReportFields
        }
      });
      stubGenKey.restore();
    });

    it('should return faq props if content type is FAQ_TYPE', function () {
      const state = {
        bottomSheet: {
          content: {
            type: FAQ_TYPE,
            id: 1
          }
        },
        faqs: []
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      contentSelector(state).should.eql({
        type: FAQ_TYPE,
        props: {
          id: null,
          fields: emptyFaqFields
        }
      });
      stubGenKey.restore();
    });
  });
});
