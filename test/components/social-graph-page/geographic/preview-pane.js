import React from 'react';
import { shallow } from 'enzyme';

import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import CRPane from 'components/common/preview-pane/panes/cr-pane';


describe('PreviewPane component', function () {
  it('should render CRPane', function () {
    const wrapper = shallow(
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
    wrapper.find(CRPane).exists().should.be.true();
  });
});
