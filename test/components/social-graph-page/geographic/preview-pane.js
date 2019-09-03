import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import CRPane from 'components/common/preview-pane/cr-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CRPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        data={ {
          to: '/complaint/123/',
          category: 'Use Of Force',
          subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
          incidentDate: 'JUL 2, 2012',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
          coaccused: [],
        } }
        type='CR'
      />
    );
    findRenderedComponentWithType(instance, CRPane).should.be.ok();
  });
});
