import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { mountWithRouter } from 'utils/test';

import CallToAction from 'components/common/preview-pane/panes/search-term-item-pane/call-to-action';


describe('CallToAction component', function () {
  it('should render link when callToActionType is link', function () {
    const wrapper = shallow(<CallToAction callToActionType='link' url='http://mylink.com/' />);

    const a = wrapper.find('.test--call-to-action');
    a.prop('href').should.equal('http://mylink.com/');
  });

  it('should render view all button when callToActionType is view_all', function () {
    const wrapper = mountWithRouter(
      <CallToAction callToActionType='view_all' name='police districts' />
    );

    wrapper.text().should.containEql('View ALL police districts');
  });

  it('should not render anything if callToActionType does not match', function () {
    const wrapper = shallow(<CallToAction callToActionType='abc' />);
    should(wrapper.getElement()).be.null();
  });

  it('should render enter button', function () {
    const wrapper = shallow(<CallToAction callToActionType='view_all' name='police districts' />);

    wrapper.find('.test--enter-button').exists().should.be.true();
  });
});
