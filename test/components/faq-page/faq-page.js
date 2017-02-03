import React from 'react';
import { scryRenderedComponentsWithType } from 'react-addons-test-utils';

import FAQPage from 'components/faq-page/faq-page';
import FAQListSection from 'components/faq-page/faq-list-section';
import configureStore from 'redux-mock-store';
import { PAGINATION_DEFAULT } from 'utils/constants';
import { renderInDragDropContext } from 'utils/test';


const mockStore = configureStore();
const store = mockStore({
  faqPage: {
    faqs: PAGINATION_DEFAULT,
    faqForm: {
      isSubmitting: false
    }
  }
});

describe('FAQPage component', function () {
  it('should render faqs section', function () {
    const instance = renderInDragDropContext(
      <FAQPage store={ store }/>
    );

    scryRenderedComponentsWithType(instance, FAQListSection).should.have.length(1);
  });
});
