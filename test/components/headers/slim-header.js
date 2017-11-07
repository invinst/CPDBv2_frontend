import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { FAQ_PATH } from 'utils/constants';
import { SlimHeader } from 'components/headers/slim-header';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { Link } from 'react-router';
import MockStore from 'redux-mock-store';
import ContextWrapper from 'utils/test/components/context-wrapper';
import { stub, spy } from 'sinon';

class SlimHeaderContextWrapper extends ContextWrapper {
}

SlimHeaderContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('SlimHeader component', function () {
  let element;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {}
  });


  beforeEach(function () {
    window.scrollTo(0, 0);
    stub(window, 'addEventListener');
    stub(window, 'removeEventListener');
  });

  afterEach(function () {
    window.addEventListener.restore();
    window.removeEventListener.restore();
    unmountComponentSuppressError(element);
  });

  it('should render nothing if "show" prop is false', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ false }/>
        </SlimHeaderContextWrapper>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(element, 'test--slim-header').length.should.eql(0);
  });

  it('should render Legal Disclaimer link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/'/>
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
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/'/>
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
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/'/>
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
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/'/>
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Glossary')[0];
    link.getAttribute('href').should.eql('https://beta.cpdb.co/glossary/');
  });

  it('should subscribe & unsubscribe scrollEventListener on mount & unmount', function () {

    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } pathname='/'/>
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const slimHeader = findRenderedComponentWithType(element, SlimHeader);
    window.addEventListener.calledWith('scroll', slimHeader.scrollEventListener).should.be.true();

    unmountComponentSuppressError(element);
    window.removeEventListener.calledWith('scroll', slimHeader.scrollEventListener).should.be.true();
  });

  it('should toggle subtitle when scrolling up or down', function () {
    const element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } pathname='/'/>
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const slimHeader = findRenderedComponentWithType(element, SlimHeader);
    slimHeader.state.showSubtitle.should.be.true();

    window.scrollY = 999;
    slimHeader.scrollEventListener();
    slimHeader.state.showSubtitle.should.be.false();

    window.scrollY = 0;
    slimHeader.scrollEventListener();
    slimHeader.state.showSubtitle.should.be.true();
  });
});
