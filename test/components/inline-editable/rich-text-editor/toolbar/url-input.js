import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import UrlInput from 'components/inline-editable/rich-text-editor/toolbar/url-input';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';
import Input from 'components/common/input';

describe('UrlInput component', function () {
  it('should render', function () {
    const wrapper = shallow(
      <UrlInput/>
    );
    wrapper.find(Bubble).exists().should.be.true();
    wrapper.find(Input).exists().should.be.true();
  });

  it('should trigger onChange when typing on url input', function () {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <UrlInput onChange={ onChange }/>
    );
    const input = wrapper.find(Input);
    input.prop('onChange')({ target: { value: 'http://example.com' } });
    onChange.should.be.calledWith('http://example.com');
  });
});
