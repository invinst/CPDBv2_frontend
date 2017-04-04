import { stub } from 'sinon';
import draftJs from 'draft-js';

import { faqSelector } from 'selectors/bottom-sheet/faq';
import { BottomSheetContentType } from 'utils/constants';
import { RichTextFieldFactory } from 'utils/test/factories/field';
import FaqFactory from 'utils/test/factories/faq';

describe('faqSelector', function () {
  it('should return existing faq', function () {
    const question = 'question';
    const answer = 'answer';
    const state = { faqs: { 1: FaqFactory.build({}, { question, answer }) } };
    const props = { type: BottomSheetContentType.FAQ, id: 1 };
    faqSelector(state, props).should.eql({
      id: 1,
      fields: {
        'question': RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
        'answer': RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
      }
    });
  });

  it('should return empty faq when id is "new"', function () {
    const state = { faqs: {} };
    const props = { type: BottomSheetContentType.REPORT, id: 'new' };
    const stubGenKey = stub(draftJs, 'genKey');
    stubGenKey.returns('abc12');
    faqSelector(state, props).should.eql({ id: null, fields: {
      question: RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [''] }),
      answer: RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [''] })
    } });
    stubGenKey.restore();
  });
});
