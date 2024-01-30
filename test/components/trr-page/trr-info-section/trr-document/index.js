import React from 'react';
import { shallow } from 'enzyme';

import TRRDocument from 'components/trr-page/trr-info-section/trr-document';

describe('Row component', function () {

  it('should hide when printing', function () {
    const wrapper = shallow(<TRRDocument alreadyRequested={ true }/>);
    wrapper.prop('className').should.containEql('no-print');
  });
});
