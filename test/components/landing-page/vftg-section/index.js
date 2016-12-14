import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import { VFTGSection } from 'components/landing-page/vftg-section';
import DatePicker from 'components/inline-editable/date-picker';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkPicker from 'components/inline-editable/link-picker';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import SubscribeForm from 'containers/landing-page/vftg-section/subscribe-form-container';

describe('VFTGSection component', function () {
  let instance;
  const fieldProps = {
    'vftg_date': { a: 'a' },
    'vftg_content': { b: 'b' },
    'vftg_link': { c: 'c' },
    'vftg_header': { e: 'e' }
  };
  const editToggleProps = {
    d: 'd'
  };
  const mockStore = MockStore();
  const store = mockStore({});

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children with appropriate styles', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <VFTGSection
          fieldProps={ fieldProps }
          editToggleProps={ editToggleProps }
          sectionEditModeOn={ true }/>
      </Provider>
    );
    const datePickerElement = findRenderedComponentWithType(instance, DatePicker);
    datePickerElement.props.a.should.eql('a');
    const headerElement = scryRenderedComponentsWithType(instance, RichTextEditable)[0];
    headerElement.props.e.should.eql('e');
    const contentElement = scryRenderedComponentsWithType(instance, RichTextEditable)[1];
    contentElement.props.b.should.eql('b');
    const linkPickerElement = findRenderedComponentWithType(instance, LinkPicker);
    linkPickerElement.props.c.should.eql('c');
    const toggleElement = findRenderedComponentWithType(instance, EditToggle);
    toggleElement.props.d.should.eql('d');
    const formElement = findRenderedComponentWithType(instance, SubscribeForm);
    formElement.props.disabled.should.be.true();
  });
});
