import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import { NETWORK_PREVIEW_PANE } from 'utils/constants';
import PreviewPane from 'components/social-graph-page/network/preview-pane/index';
import OfficerPane from 'components/common/preview-pane/officer-pane';
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
      }

    };
    instance = renderIntoDocument(
      <PreviewPane data={ data } type={ NETWORK_PREVIEW_PANE.EDGE_COACCUSALS } />
    );
    findRenderedComponentWithType(instance, EdgeCoaccusalsPane).should.be.ok();
  });
});
