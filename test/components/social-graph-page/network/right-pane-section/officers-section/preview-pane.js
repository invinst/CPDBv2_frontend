import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/social-graph-page/network/right-pane-section/officers-section/preview-pane';
import OfficerPane from 'components/common/preview-pane/officer-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficerPane', function () {
    instance = renderIntoDocument(<PreviewPane data={ { name: 'Officer' } }/>);
    findRenderedComponentWithType(instance, OfficerPane).should.be.ok();
  });
});
