import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { FAQ_PATH } from 'utils/constants';
import SlimHeader from 'components/headers/slim-header';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { Link } from 'react-router';
import MockStore from 'redux-mock-store';
import ContextWrapper from 'utils/test/components/context-wrapper';
import { spy } from 'sinon';

class SlimHeaderContextWrapper extends ContextWrapper {}
SlimHeaderContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('SlimHeader component', function () {
  let element;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {}
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render Legal Disclaimer link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedComponentsWithType(element, Link);
    const legalLink = links.filter(link => link.props.children === 'Legal Disclaimer')[0];
    legalLink.props.onClick.should.equal(openRequestDocumentModal);
  });

  it('should render FAQ link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedComponentsWithType(element, Link);
    const link = links.filter(link => link.props.children === 'FAQ')[0];
    link.props.to.should.eql('/' + FAQ_PATH);
  });

  it('should render Data link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Data')[0];
    link.getAttribute('href').should.eql('https://beta.cpdb.co/');
  });

  it('should render Glossary link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Glossary')[0];
    link.getAttribute('href').should.eql('https://beta.cpdb.co/glossary/');
  });

});
