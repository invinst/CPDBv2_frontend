import React from 'react';
import { scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import FAQPage from 'components/faq-page/faq-page';
import FAQListSection from 'components/faq-page/faq-list-section';
import configureStore from 'redux-mock-store';
import { PAGINATION_DEFAULT } from 'utils/constants';
import { renderInDragDropContext } from 'utils/test';


const mockStore = configureStore();
const store = mockStore({
  authentication: {},
  faqPage: {
    faqs: PAGINATION_DEFAULT,
    faqForm: {
      isSubmitting: false
    }
  },
  cms: {
    pages: {}
  },
  headers: {
    shareableHeader: {
      scrollPosition: 'top'
    },
    slimHeader: {
      logoSectionEditModeOn: false
    }
  }
});

describe('FAQPage component', function () {
  it('should render faqs section', function () {
    const instance = renderInDragDropContext(
      <Provider store={ store }>
        <FAQPage store={ store }/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, FAQListSection).should.have.length(1);
  });
});
