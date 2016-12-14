import React, { PropTypes } from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { FAQSection } from 'components/landing-page/faq-section';
import configureStore from 'redux-mock-store';
import { unmountComponentSuppressError } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import FAQFactory from 'utils/test/factories/faq';
import { Provider } from 'react-redux';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import PaginationFactory from 'utils/test/factories/pagination';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


class EditContextWrapper extends ContextWrapper {}
EditContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

// TODO: will try to find a solution for store props
const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    faqApp: {
      faqs: PaginationFactory.build({ results: FAQFactory.buildList(3) })
    }
  }
});

describe('FAQSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render when edit mode on', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <EditContextWrapper context={ { editModeOn: true } }>
          <FAQSection
            editToggleProps={ { a: 'a' } }
            fieldProps={ {
              'faq_header': {
                b: 'b'
              },
              'faq_randomizer': {
                c: 'c'
              }
            } }/>
        </EditContextWrapper>
      </Provider>
    );
    const toggle = findRenderedComponentWithType(instance, EditToggle);
    toggle.props.a.should.eql('a');
    const strategyForm = findRenderedComponentWithType(instance, StrategyForm);
    strategyForm.props.c.should.eql('c');
    const header = findRenderedComponentWithType(instance, RichTextEditable);
    header.props.b.should.eql('b');
  });
});
