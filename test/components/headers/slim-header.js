import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { stub, spy } from 'sinon';

import { SlimHeader } from 'components/headers/slim-header';
import { unmountComponentSuppressError } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import * as domUtils from 'utils/dom';
import { fixedStyle } from 'components/headers/slim-header/slim-header.style';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';
import { RichTextFieldFactory } from 'utils/test/factories/field';


class SlimHeaderContextWrapper extends ContextWrapper {
}

SlimHeaderContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('SlimHeader component', function () {
  let element;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {},
    cms: {
      pages: {
        'landing-page': {
          fields: {
            'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' })
          }
        }
      }
    },
    headers: {
      slimHeader: {
        logoSectionEditModeOn: false
      }
    }
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
          <SlimHeader show={ false } />
        </SlimHeaderContextWrapper>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(element, 'test--slim-header').length.should.eql(0);
  });

  it('should render Q&A link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Q&A')[0];
    link.getAttribute('href').should.eql('http://how.cpdp.works/');
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
    link.getAttribute('href').should.eql('http://cpdb.lvh.me');
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
    link.getAttribute('href').should.eql('http://cpdb.lvh.me/glossary/');
  });

  describe('External links', function () {
    it('should stopPropagation when being clicked', function () {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );
      let externalLinks = scryRenderedDOMComponentsWithClass(element, 'test--right-external-link');
      const dummyEvent = {
        stopPropagation: spy()
      };
      Simulate.click(externalLinks[0], dummyEvent);
      dummyEvent.stopPropagation.called.should.be.true();
    });
  });

  describe('recalculatePosition', function () {
    beforeEach(function () {
      stub(domUtils, 'calculatePosition');
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );

      this.slimHeader = findRenderedComponentWithType(element, SlimHeader);
    });

    afterEach(function () {
      domUtils.calculatePosition.restore();
    });

    it('should remain in top position', function () {
      domUtils.calculatePosition.returns('top');
      this.slimHeader.recalculatePosition();
      this.slimHeader.state.position.should.eql('top');
    });

    it('should transition to middle position', function () {
      domUtils.calculatePosition.returns('middle');
      this.slimHeader.recalculatePosition();
      this.slimHeader.state.position.should.eql('middle');
    });

    it('should transition to bottom position', function () {
      domUtils.calculatePosition.returns('bottom');
      this.slimHeader.recalculatePosition();
      this.slimHeader.state.position.should.eql('bottom');
    });
  });

  describe('SlimHeaderContent', function () {
    it('should be rendered with correct style on the top of the page', function () {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );

      const slimHeader = findRenderedComponentWithType(element, SlimHeader);
      slimHeader.setState({ position: 'top' });

      const slimHeaderContent = scryRenderedComponentsWithType(element, SlimHeaderContent)[0];
      slimHeaderContent.props.position.should.eql('top');
      slimHeaderContent.props.pathname.should.eql('/');
      slimHeaderContent.props.editModeOn.should.eql(false);
    });

    it('should be rendered with correct style in the middle of the page', function () {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );

      const slimHeader = findRenderedComponentWithType(element, SlimHeader);
      slimHeader.setState({ position: 'middle' });

      const slimHeaderContent = scryRenderedComponentsWithType(element, SlimHeaderContent)[1];

      slimHeaderContent.props.position.should.eql('middle');
      slimHeaderContent.props.pathname.should.eql('/');
      slimHeaderContent.props.editModeOn.should.eql(false);
      slimHeaderContent.props.disableTop.should.eql(true);
      slimHeaderContent.props.style.should.eql({
        transform: 'translateY(-100%)',
        backgroundColor: 'rgb(255, 255, 255)',
        height: '64px',
        ...fixedStyle
      });
    });

    it('should be rendered with correct style in the bottom of the page', function (done) {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );

      const slimHeader = findRenderedComponentWithType(element, SlimHeader);
      slimHeader.setState({ position: 'bottom' });
      setTimeout(function () {
        const slimHeaderContent = scryRenderedComponentsWithType(element, SlimHeaderContent)[1];
        slimHeaderContent.props.position.should.eql('bottom');
        slimHeaderContent.props.pathname.should.eql('/');
        slimHeaderContent.props.editModeOn.should.eql(false);
        slimHeaderContent.props.disableTop.should.eql(true);
        done();
      }, 1000);

    });
  });
});
