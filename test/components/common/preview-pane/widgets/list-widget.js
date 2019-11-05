import React from 'react';
import { spy } from 'sinon';

import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import ListWidget from 'components/common/preview-pane/widgets/list-widget';
import ListWidgetItem from 'components/common/preview-pane/widgets/list-widget/list-widget-item';


describe('ListWidget', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain number of allegations', function () {
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

  it('should render Link if url is available', function () {
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

  it('should stopPropagation on event when clicking on Link', function () {
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

  it('should render arrows is showItemArrow is true', function () {
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

  it('should not display when items is empty', function () {
    instance = renderIntoDocument(
      <ListWidget items={ [] } typeName='allegation'/>,
    );
    scryRenderedDOMComponentsWithClass(instance, 'list-widget-header').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'list-widget-list').should.have.length(0);
  });

  describe('collapsable', function () {
    const items = [
      {
        count: 175,
        id: 8562,
        name: 'Jerome Finnigan',
        radarAxes: [
          { axis: 'Use of Force Reports', value: 64.3694 },
          { axis: 'Officer Allegations', value: 99.8056 },
          { axis: 'Civilian Allegations', value: 99.9778 },
        ],
        radarColor: '#f0201e',
        url: '/officer/8562/jerome-finnigan/',
      },
      {
        count: 48,
        id: 17506,
        name: 'Anthony Martin',
        radarColor: '#f52524',
        radarAxes: [
          { axis: 'Use of Force Reports', value: 88.0064 },
          { axis: 'Officer Allegations', value: 88.3297 },
          { axis: 'Civilian Allegations', value: 98.226 },
        ],
        url: '/officer/17506/anthony-martin/',
      },
      {
        count: 175,
        id: 8563,
        name: 'Jerome Finnigan',
        radarAxes: [
          { axis: 'Use of Force Reports', value: 64.3694 },
          { axis: 'Officer Allegations', value: 99.8056 },
          { axis: 'Civilian Allegations', value: 99.9778 },
        ],
        radarColor: '#f0201e',
        url: '/officer/8563/jerome-finnigan/',
      },
      {
        count: 48,
        id: 17507,
        name: 'Anthony Martin',
        radarColor: '#f52524',
        radarAxes: [
          { axis: 'Use of Force Reports', value: 88.0064 },
          { axis: 'Officer Allegations', value: 88.3297 },
          { axis: 'Civilian Allegations', value: 98.226 },
        ],
        url: '/officer/17507/anthony-martin/',
      },
    ];

    it('should not render View more button when collapsable but there are only 3 items or less', function () {
      instance = renderIntoDocument(
        <ListWidget
          typeName='allegation'
          items={ items.slice(0, 3) }
          title='TITLE'
          collapsable={ true }
        />
      );

      scryRenderedDOMComponentsWithClass(instance, 'collapsed-toggle').should.have.length(0);
    });

    it('should render View more button when collapsable and having more than 3 items', function () {
      instance = renderIntoDocument(
        <ListWidget
          typeName='allegation'
          items={ items }
          title='TITLE'
          collapsable={ true }
        />
      );

      const viewMoreButton = findRenderedDOMComponentWithClass(instance, 'collapsed-toggle');
      viewMoreButton.textContent.should.equal('View more');

      scryRenderedComponentsWithType(instance, ListWidgetItem).should.have.length(3);
    });

    it.only('should show all or hide some items when clicking on collapsed toggle', function (done) {
      instance = renderIntoDocument(
        <ListWidget
          typeName='allegation'
          items={ items }
          title='TITLE'
          collapsable={ true }
        />
      );

      scryRenderedComponentsWithType(instance, ListWidgetItem).should.have.length(3);
      const collapsedToggle = findRenderedDOMComponentWithClass(instance, 'collapsed-toggle');
      collapsedToggle.textContent.should.equal('View more');

      Simulate.click(collapsedToggle);
      scryRenderedComponentsWithType(instance, ListWidgetItem).should.have.length(4);
      collapsedToggle.textContent.should.equal('View less');

      Simulate.click(collapsedToggle);
      instance.state.collapsed ? console.warn('instance.state.collapsed'): null;
      scryRenderedComponentsWithType(instance, ListWidgetItem).should.have.length(3);
      collapsedToggle.textContent.should.equal('View more');
    });
  });
});
