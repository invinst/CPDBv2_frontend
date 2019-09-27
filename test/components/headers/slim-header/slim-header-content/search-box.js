import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import * as editPathUtils from 'utils/edit-path';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';
import styles from 'components/headers/slim-header/slim-header-content/search-box.sass';
import { accentColor, boulderColor } from 'utils/styles';


describe('SearchBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render at top correctly', function () {
    instance = renderIntoDocument(<SearchBox position='top'/>);

    findDOMNode(instance).getAttribute('class').should.equal(`${styles.searchBox} top`);
    findRenderedDOMComponentWithClass(instance, 'search-box-search-text').textContent.should.equal('Search');
    findRenderedDOMComponentWithClass(instance, 'search-box-term').textContent.should.equal('What can I search?');

    const magnifyingGlass = findRenderedComponentWithType(instance, MagnifyingGlass);
    magnifyingGlass.props.className.should.equal('search-box-magnifying-glass');
    magnifyingGlass.props.color.should.equal(accentColor);
  });

  it('should render at middle correctly', function () {
    instance = renderIntoDocument(<SearchBox position='middle'/>);

    findDOMNode(instance).getAttribute('class').should.equal(`${styles.searchBox} middle`);
    findRenderedDOMComponentWithClass(instance, 'search-box-search-text').textContent.should.equal('Search');
    findRenderedDOMComponentWithClass(instance, 'search-box-term').textContent.should.equal('What can I search?');

    const magnifyingGlass = findRenderedComponentWithType(instance, MagnifyingGlass);
    magnifyingGlass.props.className.should.equal('search-box-magnifying-glass');
    magnifyingGlass.props.color.should.equal(boulderColor);
  });

  it('should render at bottom correctly', function () {
    instance = renderIntoDocument(<SearchBox position='bottom'/>);

    findDOMNode(instance).getAttribute('class').should.equal(`${styles.searchBox} bottom`);
    findRenderedDOMComponentWithClass(instance, 'search-box-search-text').textContent.should.equal('Search');
    findRenderedDOMComponentWithClass(instance, 'search-box-term').textContent.should.equal('What can I search?');

    const magnifyingGlass = findRenderedComponentWithType(instance, MagnifyingGlass);
    magnifyingGlass.props.className.should.equal('search-box-magnifying-glass');
    magnifyingGlass.props.color.should.equal('#005EF4');
  });

  it('should go to search page when being clicked', function () {
    const pushPathPreserveEditMode = stub(editPathUtils, 'pushPathPreserveEditMode');
    const stopPropagation = spy();

    instance = renderIntoDocument(<SearchBox position='top'/>);

    Simulate.click(findDOMNode(instance), { stopPropagation });

    stopPropagation.should.be.calledOnce();
    pushPathPreserveEditMode.should.be.calledOnce();
    pushPathPreserveEditMode.should.be.calledWith('/search/');

    pushPathPreserveEditMode.restore();
  });
});
