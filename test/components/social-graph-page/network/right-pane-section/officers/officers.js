import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Officers, { OfficersWithSpinner } from 'components/social-graph-page/network/right-pane-section/officers';
import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers/officer-row';
import LoadingSpinner from 'components/common/loading-spinner';
import styles from 'components/social-graph-page/network/right-pane-section/officers/officers.sass';


describe('Officers component', function () {
  let instance;

  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1,
      percentile: {
        officerId: 1,
        year: 2007,
        items: [
          { axis: 'Use of Force Reports', value: 92.3 },
          { axis: 'Officer Allegations', value: 82 },
          { axis: 'Civilian Allegations', value: 97 }
        ],
        visualTokenBackground: '#f52524',
        textColor: '#DFDFDF'
      }
    },
    {
      fullName: 'Edward May',
      id: 2,
      percentile: {
        officerId: 2,
        year: 2008,
        items: [
          { axis: 'Use of Force Reports', value: 94.3 },
          { axis: 'Officer Allegations', value: 81.5 },
          { axis: 'Civilian Allegations', value: 95.7 }
        ],
        visualTokenBackground: '#f52524',
        textColor: '#DFDFDF'
      }
    }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer row(s) correctly', function () {
    instance = renderIntoDocument(<Officers officers={ officers }/>);
    const officerRows = scryRenderedComponentsWithType(instance, OfficerRow);
    officerRows.should.have.length(2);
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      instance = renderIntoDocument(
        <OfficersWithSpinner officers={ officers } requesting={ true } />
      );

      scryRenderedComponentsWithType(instance, Officers).should.have.length(0);

      const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
      loadingSpinner.props.className.should.equal(styles.officersLoading);
    });

    it('should not render LoadingSpinner only if requesting is false', function () {
      instance = renderIntoDocument(
        <OfficersWithSpinner officers={ officers } requesting={ false } />
      );

      scryRenderedComponentsWithType(instance, Officers).should.have.length(1);
      scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
    });
  });
});
