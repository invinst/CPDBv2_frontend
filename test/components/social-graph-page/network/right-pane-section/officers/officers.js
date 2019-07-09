import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers/officer-row';


describe('Officers component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer row(s) correctly', function () {
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
    instance = renderIntoDocument(<Officers officers={ officers }/>);
    const officerRows = scryRenderedComponentsWithType(instance, OfficerRow);
    officerRows.should.have.length(2);
  });
});
