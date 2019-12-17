import React from 'react';
import { shallow } from 'enzyme';

import PoliceDistrictPane from 'components/common/preview-pane/panes/police-district-pane';
import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/common/preview-pane/widgets';


describe('PoliceDistrictPane component', () => {
  it('should contain the sub components', () => {
    const mostComplaintOfficers = [
      { id: 1, name: 'Robert Seaberry', count: 59 },
      { id: 2, name: 'Conray Jones', count: 32 },
    ];
    const commander = { id: 123, name: 'Ernest Cato', count: 3 };

    const wrapper = shallow(
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

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').url.should.equal('some_url');
    widgetWrapper.prop('maxHeight').should.equal(830);

    const header = wrapper.find(HeaderWidget);
    const geo = wrapper.find(GeoInfoWidget);
    const allegationCount = wrapper.find(AllegationCountWidget);
    const widgets = wrapper.find(ListWidget);

    header.render().text().should.containEql('POLICE DISTRICT AUSTIN');

    geo.prop('raceCount').should.eql([]);
    geo.prop('population').should.equal(6789);

    allegationCount.prop('numOfAllegations').should.equal(1);
    allegationCount.prop('subTitle').should.equal('More than 10% of other districts');
    allegationCount.prop('url').should.equal('some_url');

    widgets.should.have.length(2);

    widgets.at(0).prop('typeName').should.equal('allegation');
    widgets.at(0).prop('title').should.equal('OFFICERS WITH MOST COMPLAINTS');
    widgets.at(0).prop('items').should.eql(
      [
        { id: 1, name: 'Robert Seaberry', count: 59 },
        { id: 2, name: 'Conray Jones', count: 32 },
      ]
    );

    widgets.at(1).prop('typeName').should.equal('allegation');
    widgets.at(1).prop('title').should.equal('DISTRICT COMMANDER');
    widgets.at(1).prop('items').should.eql([{ id: 123, name: 'Ernest Cato', count: 3 }]);
  });


  it('should always pass districtCommander as array', function () {
    const wrapper = shallow(<PoliceDistrictPane name='Austin'/>);
    const widgets = wrapper.find(ListWidget);

    widgets.at(1).prop('items').should.eql([]);
  });
});
