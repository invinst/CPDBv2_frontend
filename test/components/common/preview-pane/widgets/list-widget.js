import React from 'react';
import { spy } from 'sinon';

import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import ListWidget from 'components/common/preview-pane/widgets/list-widget';


describe('ListWidget', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain number of allegations', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90,
      },
      {
        'id': 2,
        'name': 'Category Name 2',
        'count': 32,
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const instanceDOM = findDOMNode(instance);
    const categories = instanceDOM.getElementsByTagName('li');
    categories[0].textContent.should.containEql('Category Name 1');
    categories[0].textContent.should.containEql('90 allegations');
    categories[1].textContent.should.containEql('Category Name 2');
    categories[1].textContent.should.containEql('32 allegations');
  });

  it('should render Link if url is available', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90,
        'url': 'url_1',
      },
      {
        'id': 2,
        'name': 'Category Name 2',
        'count': 32,
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const firstListItem = findRenderedComponentWithType(instance, Link);
    firstListItem.props.to.should.eql('url_1');
  });

  it('should stopPropagation on event when clicking on Link', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90,
        'url': 'url_1',
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    const eventSpy = { stopPropagation: spy() };
    link.props.onClick(eventSpy);
    eventSpy.stopPropagation.should.be.called();
  });

  it('should render arrows is showItemArrow is true', () => {
    const complaintCategories = [{
      'id': 1,
      'name': 'Category Name 1',
      'count': 90,
      'url': 'url_1',
    },
    {
      'id': 2,
      'name': 'Category Name 2',
      'count': 32,
    }];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
        showItemArrow={ true }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'list-widget-list-item-arrow').should.have.length(2);
  });

  it('should not display when items is empty', () => {
    instance = renderIntoDocument(
      <ListWidget items={ [] } typeName='allegation' />
    );
    scryRenderedDOMComponentsWithClass(instance, 'list-widget-header').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'list-widget-list').should.have.length(0);
  });
});
