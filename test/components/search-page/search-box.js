import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import TextInput from 'components/common/input';
import SearchBox from 'components/search-page/search-box';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchBox.should.be.renderable();
  });

  it('should pass correct props to Input', function () {
    const onEscape = spy();
    const onChange = spy();
    const onEnter = spy();

    instance = renderIntoDocument(
      <SearchBox
        onEscape={ onEscape }
        onChange={ onChange }
        onEnter={ onEnter }
        value='wa'
      />
    );

    const input = findRenderedComponentWithType(instance, TextInput);
    input.props.value.should.eql('wa');
    input.props.keyPressHandlers.should.eql({
      esc: onEscape,
      enter: onEnter
    });
    input.props.onChange.should.equal(onChange);
    input.props.blurOnKeyPress.should.eql(['up', 'down']);
  });
});
