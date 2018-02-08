import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusedDropdownButton from 'components/cr-page/header/coaccused-dropdown-button';


describe('CoaccusedDropdownButton component', function () {
  let instance;
  const coaccused = [
    { id: 1, fullName: 'John' },
    { id: 2, fullName: 'Alex' },
    { id: 3, fullName: 'Boo' }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if given no coaccused', function () {
    instance = renderIntoDocument(<CoaccusedDropdownButton coaccused={ [] }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--coaccused-dropdown-button').should.have.length(0);
  });

  it('should render nothing if given only one coaccused', function () {
    instance = renderIntoDocument(<CoaccusedDropdownButton coaccused={ coaccused.slice(0, 1) }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--coaccused-dropdown-button').should.have.length(0);
  });

  it('should show "<name> and n more coaccused" if given more than 2 coaccused', function () {
    instance = renderIntoDocument(<CoaccusedDropdownButton coaccused={ coaccused } officerId={ 1 }/>);
    findDOMNode(instance).innerHTML.should.containEql('Alex and 1 more coaccused');
  });

  it('should show "Coaccused with <name>" if given exactly 2 coaccused', function () {
    instance = renderIntoDocument(<CoaccusedDropdownButton coaccused={ coaccused.slice(0, 2) } officerId={ 1 }/>);
    findDOMNode(instance).innerHTML.should.containEql('Coaccused with Alex');
  });

  it('should trigger onClick when clicked on', function () {
    const onClick = spy();
    instance = renderIntoDocument(
      <CoaccusedDropdownButton coaccused={ coaccused } officerId={ 1 } onClick={ onClick }/>
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button'));
    onClick.called.should.be.true();
  });

  describe('text', function () {
    it('should have correct color when showing drop down', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ true }
          hovering={ true }
          scrollPosition='top'
        />
      );
      const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button');
      dropdownButton.style.color.should.eql('rgb(35, 31, 32)');
    });

    it('should have correct color when at bottom and hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ true }
          scrollPosition='bottom'
        />
      );
      const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button');
      dropdownButton.style.color.should.eql('rgb(0, 94, 244)');
    });

    it('should have correct color when at bottom and not hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ false }
          scrollPosition='bottom'
        />
      );
      const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button');
      dropdownButton.style.color.should.eql('white');
    });

    it('should have correct color when at middle and hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ true }
          scrollPosition='middle'
        />
      );
      const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button');
      dropdownButton.style.color.should.eql('rgb(35, 31, 32)');
    });

    it('should have correct color when at middle and not hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ false }
          scrollPosition='middle'
        />
      );
      const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-button');
      dropdownButton.style.color.should.eql('rgb(0, 94, 244)');
    });
  });

  describe('arrow', function () {
    it('should have correct color when showing drop down', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ true }
          hovering={ true }
          scrollPosition='top'
        />
      );
      const dropdownArrow = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-arrow');
      dropdownArrow.style.background.should.containEql('arrow-up-soft-black.svg');
    });

    it('should have correct color when at bottom and hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ true }
          scrollPosition='bottom'
        />
      );
      const dropdownArrow = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-arrow');
      dropdownArrow.style.background.should.containEql('arrow-down-blue.svg');
    });

    it('should have correct color when at bottom and not hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ false }
          scrollPosition='bottom'
        />
      );
      const dropdownArrow = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-arrow');
      dropdownArrow.style.background.should.containEql('arrow-down-white.svg');
    });

    it('should have correct color when at middle and hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ true }
          scrollPosition='middle'
        />
      );
      const dropdownArrow = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-arrow');
      dropdownArrow.style.background.should.containEql('arrow-down-grey.svg');
    });

    it('should have correct color when at middle and not hovered', function () {
      instance = renderIntoDocument(
        <CoaccusedDropdownButton
          coaccused={ coaccused }
          officerId={ 1 }
          displayCoaccusedDropdown={ false }
          hovering={ false }
          scrollPosition='middle'
        />
      );
      const dropdownArrow = findRenderedDOMComponentWithClass(instance, 'test--coaccused-dropdown-arrow');
      dropdownArrow.style.background.should.containEql('arrow-down-blue.svg');
    });
  });
});
