import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import PoliceDistrictPane from 'components/common/preview-pane/police-district-pane';
import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('PoliceDistrictPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    const mostComplaintOfficers = [
      { id: 1, name: 'Robert Seaberry', count: 59 },
      { id: 2, name: 'Conray Jones', count: 32 },
    ];
    const commander = { id: 123, name: 'Ernest Cato', count: 3 };

    instance = renderIntoDocument(
      <PoliceDistrictPane
        name='Austin'
        raceCount={ [] }
        population={ 6789 }
        allegationCount={ 1 }
        allegationPercentile={ 10.2 }
        officersMostComplaint={ mostComplaintOfficers }
        districtCommander={ commander }
        url='some_url'
      />
    );

    const wrapper = findRenderedComponentWithType(instance, WidgetWrapper);
    wrapper.props.callToAction.url.should.eql('some_url');

    const header = findRenderedComponentWithType(instance, HeaderWidget);
    const geo = findRenderedComponentWithType(instance, GeoInfoWidget);
    const allegationCount = findRenderedComponentWithType(instance, AllegationCountWidget);
    const widgets = scryRenderedComponentsWithType(instance, ListWidget);
    findRenderedComponentWithType(instance, CallToActionWidget);

    findDOMNode(header).textContent.should.containEql('POLICE DISTRICT AUSTIN');

    geo.props.raceCount.should.eql([]);
    geo.props.population.should.eql(6789);

    allegationCount.props.numOfAllegations.should.eql(1);
    allegationCount.props.subTitle.should.eql('More than 10% of other districts');
    allegationCount.props.url.should.eql('some_url');

    widgets.should.have.length(2);

    widgets[0].props.typeName.should.eql('allegation');
    widgets[0].props.title.should.eql('OFFICERS WITH MOST COMPLAINTS');
    widgets[0].props.items.should.eql(
      [
        { id: 1, name: 'Robert Seaberry', count: 59 },
        { id: 2, name: 'Conray Jones', count: 32 },
      ]
    );

    widgets[1].props.typeName.should.eql('allegation');
    widgets[1].props.title.should.eql('DISTRICT COMMANDER');
    widgets[1].props.items.should.eql([{ id: 123, name: 'Ernest Cato', count: 3 }]);
  });


  it('should always pass districtCommander as array', function () {
    instance = renderIntoDocument(<PoliceDistrictPane name='Austin'/>);
    const widgets = scryRenderedComponentsWithType(instance, ListWidget);

    widgets[1].props.items.should.eql([]);
  });
});
