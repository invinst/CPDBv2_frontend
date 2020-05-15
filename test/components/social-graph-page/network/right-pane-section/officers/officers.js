import React from 'react';
import { shallow } from 'enzyme';

import Officers, { OfficersWithSpinner } from 'components/social-graph-page/network/right-pane-section/officers';
import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers/officer-row';
import LoadingSpinner from 'components/common/loading-spinner';
import styles from 'components/social-graph-page/network/right-pane-section/officers/officers.sass';


describe('Officers component', function () {

  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1,
      percentile: {
        officerId: 1,
        items: [
          { axis: 'Use of Force Reports', value: 92.3 },
          { axis: 'Officer Allegations', value: 82 },
          { axis: 'Civilian Allegations', value: 97 },
        ],
        visualTokenBackground: '#F52524',
        textColor: '#DFDFDF',
      },
    },
    {
      fullName: 'Edward May',
      id: 2,
      percentile: {
        officerId: 2,
        items: [
          { axis: 'Use of Force Reports', value: 94.3 },
          { axis: 'Officer Allegations', value: 81.5 },
          { axis: 'Civilian Allegations', value: 95.7 },
        ],
        visualTokenBackground: '#F52524',
        textColor: '#DFDFDF',
      },
    },
  ];

  it('should render officer row(s) correctly', function () {
    const wrapper = shallow(<Officers officers={ officers }/>);
    const officerRows = wrapper.find(OfficerRow);
    officerRows.should.have.length(2);
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      const wrapper = shallow(
        <OfficersWithSpinner officers={ officers } requesting={ true } />
      );

      wrapper.find(Officers).exists().should.be.false();

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(styles.officersLoading);
    });

    it('should not render LoadingSpinner only if requesting is false', function () {
      const wrapper = shallow(
        <OfficersWithSpinner officers={ officers } requesting={ false } />
      );

      wrapper.find(Officers).exists().should.be.true();
      wrapper.find(LoadingSpinner).exists().should.be.false();
    });
  });
});
