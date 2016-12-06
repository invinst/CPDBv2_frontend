import { spy } from 'sinon';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Faq from 'components/bottom-sheet/faq';


describe('Faq component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call fetchFAQ if faqId is a number and fields empty', function () {
    const fetchFAQ = spy();

    instance = renderIntoDocument(
      <Faq
        faqId={ 1 }
        fetchFAQ={ fetchFAQ }
      />
    );

    fetchFAQ.calledWith(1).should.be.true();
  });

  it('shouldn\'t call fetchFAQ if faqId is null', function () {
    const fetchFAQ = spy();

    instance = renderIntoDocument(
      <Faq
        fetchFAQ={ fetchFAQ }
      />
    );

    fetchFAQ.calledWith(1).should.be.false();
  });

  it('shouldn\'t call fetchFAQ if faqId is `new`', function () {
    const fetchFAQ = spy();

    instance = renderIntoDocument(
      <Faq
        faqId='new'
        fetchFAQ={ fetchFAQ }
      />
    );

    fetchFAQ.calledWith(1).should.be.false();
  });

  it('shouldn\'t call fetchFAQ if field is not empty', function () {
    const fetchFAQ = spy();

    instance = renderIntoDocument(
      <Faq
        faqId={ 1 }
        fields={ {} }
        fetchFAQ={ fetchFAQ }
      />
    );

    fetchFAQ.calledWith(1).should.be.false();
  });
});
