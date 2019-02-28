import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  Simulate,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareMenu from 'components/headers/shareable-header/share-menu';


describe('HeaderButton component', function () {
  let element;

  beforeEach(function () {
    element = renderIntoDocument(<HeaderButton scrollPosition='top' buttonText='Header button'/>);
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be render contents', function () {
    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'test--button');
    shareButtonDOMElement.textContent.should.eql('Header button');
    shareButtonDOMElement.className.should.containEql('top');
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
  });

  it('should close "share" menu by default', function () {
    element.state.shareMenuIsOpen.should.be.false();
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
  });

  it('should toggle menu when being clicked', function () {
    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'test--button');
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
    Simulate.click(shareButtonDOMElement);
    findRenderedComponentWithType(element, ShareMenu);
    Simulate.click(shareButtonDOMElement);
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
  });

  it('should add focus class name when shareMenuIsOpen', function () {
    Simulate.click(findRenderedDOMComponentWithClass(element, 'test--button'));

    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'test--button');
    shareButtonDOMElement.className.should.containEql('focus');
    shareButtonDOMElement.className.should.not.containEql('top');
  });

  it('Should render custom menu', function () {
    class CustomMenu extends React.Component {
      render() {
        return <div/>;
      }
    }

    element = renderIntoDocument(
      <HeaderButton scrollPosition='top' buttonText='Header button' Menu={ CustomMenu }/>
    );

    Simulate.click(findRenderedDOMComponentWithClass(element, 'test--button'));

    findRenderedComponentWithType(element, CustomMenu);
  });
});
