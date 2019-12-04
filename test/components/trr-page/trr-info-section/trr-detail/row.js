import React from 'react';
import { shallow } from 'enzyme';

import Row from 'components/trr-page/trr-info-section/trr-detail/row';
import Popup from 'components/common/popup';


describe('Row component', function () {
  const popup = {
    title: 'Force Category',
    text: 'Some force category explanation',
  };

  it('should render popup', function () {
    const wrapper = shallow(<Row popup={ popup } pathName='/trr/62131/'/>);
    const rowPopup = wrapper.find(Popup);
    rowPopup.prop('title').should.equal('Force Category');
    rowPopup.prop('text').should.equal('Some force category explanation');
    rowPopup.prop('url').should.equal('/trr/62131/');
  });

  it(
    'should add inline-print class name to title and value to style differently if twoRowsWhenPrint is true',
    function () {
      const wrapper = shallow(<Row popup={ popup } pathName='/trr/62131/' twoRowsWhenPrint={ true }/>);
      wrapper.find('.trr-detail-row-title').hasClass('inline-print').should.be.true();
      wrapper.find('.trr-detail-row-value').hasClass('inline-print').should.be.true();
    }
  );
});
