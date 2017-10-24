import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  findAllInRenderedTree,
  isCompositeComponentWithType
} from 'react-addons-test-utils';

import SideBar from 'components/officer-page/timeline-page/sidebar';
import Minimap from 'components/officer-page/timeline-page/minimap';
import { unmountComponentSuppressError } from 'utils/test';


describe('Timeline SideBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Minimap', function () {
    instance = renderIntoDocument(
      <SideBar filters={ {} }/>
    );

    scryRenderedComponentsWithType(instance, Minimap).should.have.length(1);
  });

  it('should render currently applied filters', function () {
    instance = renderIntoDocument(
      <SideBar pathname='/officer/123/timeline/' filters={ { category: 'Use of Force', age: '51+' } }/>
    );

    const blocks = scryRenderedDOMComponentsWithClass(instance, 'test--filter-block');
    blocks.should.have.length(2);
    blocks[0].textContent.should.containEql('Use of ForceComplaints');
    blocks[1].textContent.should.containEql('51+Complaints');

    const clearAgeFilterLink = findAllInRenderedTree(instance, (comp) => {
      return (
        isCompositeComponentWithType(comp, Link) &&
        comp.props.to === '/officer/123/timeline/?age=51%2B'
      );
    });
    clearAgeFilterLink.should.have.length(1);

    const clearCategoryFilterLink = findAllInRenderedTree(instance, comp => {
      return (
        isCompositeComponentWithType(comp, Link) &&
        comp.props.to === '/officer/123/timeline/?category=Use%20of%20Force'
      );
    });
    clearCategoryFilterLink.should.have.length(1);
  });

  it('should render "Clear filters" link', function () {
    instance = renderIntoDocument(
      <SideBar pathname='/officer/123/timeline/' filters={ { category: 'Use of Force', age: '51+' } }/>
    );

    const clearFiltersLink = findAllInRenderedTree(instance, (comp) => {
      return (
        isCompositeComponentWithType(comp, Link) &&
        comp.props.to === '/officer/123/timeline/'
      );
    });
    clearFiltersLink.should.have.length(1);
    clearFiltersLink[0].props.children.should.eql('Clear filters');
  });
});
