import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { each, find } from 'lodash';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ContextWrapper from 'utils/test/components/context-wrapper';
import { getCurrentPathname } from 'utils/dom';
import { ROOT_PATH, STORIES_PATH } from 'utils/constants';
import Link from 'components/common/react-router-link';
import { unmountComponentSuppressError } from 'utils/test';
import CloseButton from 'components/common/close-btn';
import HeaderContent, { links } from 'components/header/header-content';
import ClosableNavLink from 'components/closable-nav-link';


class HeaderContentContextWrapper extends ContextWrapper {}
HeaderContentContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('HeaderContent component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({ authentication: {
    apiAccessToken: 'apiAccessToken'
  }, adapter: 'adapter' });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render links and logo', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContent pathname={ ROOT_PATH }/>
      </Provider>
    );
    const link = scryRenderedComponentsWithType(instance, Link)[3];
    link.props.to.should.eql(ROOT_PATH);
    findDOMNode(link).innerText.should.eql('CPDP');
    const navLinks = scryRenderedComponentsWithType(instance, ClosableNavLink);
    navLinks.length.should.eql(3);
    navLinks[0].props.href.should.eql(`/${STORIES_PATH}`);
  });

  it('should render edit links in edit mode', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContentContextWrapper context={ { editModeOn: true } }>
          <HeaderContent pathname={ ROOT_PATH }/>
        </HeaderContentContextWrapper>
      </Provider>
    );
    const navLinks = scryRenderedComponentsWithType(instance, ClosableNavLink);
    navLinks.length.should.eql(3);
    navLinks[0].props.href.should.eql(`/edit/${STORIES_PATH}`);
  });

  it('should display close button beneath appropriate nav link', function () {
    each(links, ({ name, href }) => {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <HeaderContent compact={ true } pathname={ href }/>
        </Provider>
      );
      const navLinks = scryRenderedComponentsWithType(instance, ClosableNavLink);
      const navLink = find(navLinks, element => element.props.href === href);
      navLink.props.showCloseBtn.should.be.true();
    });
  });

  it('should go to base path when click close button', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContent pathname={ ROOT_PATH }/>
      </Provider>
    );
    const navLink = scryRenderedComponentsWithType(instance, ClosableNavLink)[0];
    navLink.props.onClickClose();
    getCurrentPathname().should.equal(ROOT_PATH);
  });

  it('should go to edit base path when click close button in edit mode', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContentContextWrapper context={ { editModeOn: true } }>
          <HeaderContent pathname={ `/edit/${STORIES_PATH}` }/>
        </HeaderContentContextWrapper>
      </Provider>
    );
    const navLink = scryRenderedComponentsWithType(instance, ClosableNavLink)[0];
    navLink.props.onClickClose();
    getCurrentPathname().should.equal('/edit/');
  });

  it('should not show close button when at base path', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContent pathname={ ROOT_PATH } />
      </Provider>
    );
    scryRenderedComponentsWithType(instance, CloseButton).length.should.equal(0);
  });

  it('should display log out button', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeaderContent pathname={ `/edit/${STORIES_PATH}` }/>
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'test--logout-button');
  });
});
