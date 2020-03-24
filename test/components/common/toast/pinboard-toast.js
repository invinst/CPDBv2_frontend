import React from 'react';
import { mount } from 'enzyme';
import ReactMarkdown from 'react-markdown';

import PinboardToast from 'components/common/toast/pinboard-toast';


describe('PinboardToast component', function () {
  it('should render correctly', function () {
    const wrapper = mount(<PinboardToast toastMessage='**bold** toast message'/>);
    wrapper.find(ReactMarkdown).prop('source').should.equal('**bold** toast message');
    wrapper.find('.go-to-pinboard-btn').text().should.equal('Go to pinboard');
  });
});
