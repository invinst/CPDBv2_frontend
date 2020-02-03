import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers/officer-row';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerRow component', function () {
  const officer = {
    fullName: 'Jerome Finnigan',
    id: 123,
    percentile: {
      officerId: 123,
      year: 2007,
      items: [
        { axis: 'Use of Force Reports', value: 92.3 },
        { axis: 'Officer Allegations', value: 82 },
        { axis: 'Civilian Allegations', value: 97 },
      ],
      visualTokenBackground: '#f52524',
      textColor: '#DFDFDF',
    },
  };

  it('should render officer correctly', function () {
    const wrapper = shallow(<OfficerRow officer={ officer }/>);
    const radarChart = wrapper.find(StaticRadarChart);
    const officerName = wrapper.find('.officer-name');
    radarChart.exists().should.be.true();
    officerName.text().should.equal('Jerome Finnigan');
  });

  it('should call updateSelectedOfficerId when clicking', function () {
    const updateSelectedOfficerIdStub = sinon.stub();
    const wrapper = shallow(
      <OfficerRow
        officer={ officer }
        updateSelectedOfficerId={ updateSelectedOfficerIdStub }
      />
    );
    wrapper.simulate('click');
    updateSelectedOfficerIdStub.should.be.calledWith(123);
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if officer is changed', function () {
      const wrapper = shallow(
        <OfficerRow
          officer={ officer }
        />
      );

      wrapper.instance().shouldComponentUpdate({ officer: { fullName: 'Jane' } }).should.be.true();
    });

    it('should return false if officer is not changed', function () {
      const wrapper = shallow(
        <OfficerRow
          officer={ officer }
        />
      );

      wrapper.instance().shouldComponentUpdate({ officer: officer }).should.be.false();
    });
  });

});
