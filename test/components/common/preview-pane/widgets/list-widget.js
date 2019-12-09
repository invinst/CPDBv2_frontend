import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Collapse, { Panel } from 'rc-collapse';
import { Link } from 'react-router';

import ListWidget from 'components/common/preview-pane/widgets/list-widget';
import ListWidgetItem from 'components/common/preview-pane/widgets/list-widget/list-widget-item';


describe('ListWidget', () => {
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
    const wrapper = mount(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const categories = wrapper.find('li');
    categories.at(0).text().should.containEql('Category Name 1');
    categories.at(0).text().should.containEql('90 allegations');
    categories.at(1).text().should.containEql('Category Name 2');
    categories.at(1).text().should.containEql('32 allegations');
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
    const wrapper = mount(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const firstListItem = wrapper.find(Link);
    firstListItem.prop('to').should.equal('url_1');
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
    const wrapper = mount(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const link = wrapper.find(Link);
    const eventSpy = { stopPropagation: spy() };
    link.prop('onClick')(eventSpy);
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
    const wrapper = mount(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
        showItemArrow={ true }
      />
    );
    wrapper.find('.list-widget-list-item-arrow').should.have.length(2);
  });

  it('should not display when items is empty', function () {
    const wrapper = shallow(
      <ListWidget items={ [] } typeName='allegation'/>,
    );
    wrapper.find('.list-widget-header').exists().should.be.false();
    wrapper.find('.list-widget-list').exists().should.be.false();
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

    it('should not render Collapse when not collapsable', function () {
      const wrapper = shallow(
        <ListWidget
          typeName='allegation'
          items={ items }
          title='TITLE'
          collapsable={ false }
        />,
      );

      wrapper.find(Collapse).exists().should.be.false();
      wrapper.find(ListWidgetItem).should.have.length(4);
    });
    it('should not render Panel when collapsable but there are only 3 items or less', function () {
      const wrapper = shallow(
        <ListWidget
          typeName='allegation'
          items={ items.slice(0, 3) }
          title='TITLE'
          collapsable={ true }
        />,
      );

      wrapper.find(Panel).exists().should.be.false();
    });

    it('should render Collapse when collapsable and having more than 3 items', function () {
      const wrapper = shallow(
        <ListWidget
          typeName='allegation'
          items={ items }
          title='TITLE'
          collapsable={ true }
        />,
      );

      wrapper.find(Collapse).exists().should.be.true();
    });

    it('should render show more items when clicking on View more', function (done) {
      const wrapper = mount(
        <ListWidget
          typeName='allegation'
          items={ items }
          title='TITLE'
          collapsable={ true }
        />,
      );

      const collapse = wrapper.find(Collapse);
      const panel = collapse.find(Panel);
      const header = collapse.find('.rc-collapse-header');

      panel.prop('header').should.equal('View more');
      collapse.find(ListWidgetItem).exists().should.be.false();
      wrapper.find(ListWidgetItem).should.have.length(3);

      header.simulate('click');

      setTimeout(() => {
        collapse.find(ListWidgetItem).exists().should.be.true();
        wrapper.find(ListWidgetItem).should.have.length(4);
        done();
      }, 500);
    });
  });
});
