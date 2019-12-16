import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import { NETWORK_PREVIEW_PANE } from 'utils/constants';
import PreviewPane from 'components/social-graph-page/network/preview-pane/index';
import OfficerPane from 'components/common/preview-pane/panes/officer-pane';
import CRPane from 'components/common/preview-pane/panes/cr-pane';
import EdgeCoaccusalsPane from 'components/social-graph-page/network/preview-pane/edge-coaccusals-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficerPane', function () {
    instance = renderIntoDocument(<PreviewPane data={ { name: 'Officer' } } type={ NETWORK_PREVIEW_PANE.OFFICER } />);
    findRenderedComponentWithType(instance, OfficerPane).should.be.ok();
  });

  it('should render EdgeCoaccusalsPane', function () {
    const data = {
      items: [],
      pathname: '/social-graph/',
      info: {
        sourceOfficerName: 'Jerome Finnigan',
        targetOfficerName: 'Edward May',
        coaccusedCount: 10,
      },

    };
    instance = renderIntoDocument(
      <PreviewPane data={ data } type={ NETWORK_PREVIEW_PANE.EDGE_COACCUSALS } />
    );
    findRenderedComponentWithType(instance, EdgeCoaccusalsPane).should.be.ok();
  });

  it('should render CRPane', function () {
    const data = {
      category: 'Use of Force',
      subCategory: 'Illegal Arrest / False Arrest',
      incidentDate: 'OCT 10, 2007',
      address: '3510 Michigan Ave, Chicago, IL 60653',
      to: '/complaint/123456/',
      victims: ['Black, Male', 'White, Male'],
      coaccused: [
        {
          id: 21992,
          name: 'Johnny Patterson',
          url: '/officer/21992/johnny-patterson/',
          count: 42,
          radarAxes: [
            {
              'axis': 'Use of Force Reports',
              'value': 0,
            },
            {
              'axis': 'Officer Allegations',
              'value': 85.8654,
            },
            {
              'axis': 'Civilian Allegations',
              'value': 49.4652,
            },
          ],
          radarColor: '#f9946b',
        },
      ],
    };
    instance = renderIntoDocument(<PreviewPane data={ data } type={ NETWORK_PREVIEW_PANE.CR } />);
    findRenderedComponentWithType(instance, CRPane).should.be.ok();
  });
});
