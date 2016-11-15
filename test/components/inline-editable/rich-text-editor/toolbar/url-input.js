import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import UrlInput from 'components/inline-editable/rich-text-editor/toolbar/url-input';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';
import Input from 'components/inline-editable/rich-text-editor/toolbar/input';

describe('UrlInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    instance = renderIntoDocument(<UrlInput/>);
    findRenderedComponentWithType(instance, Bubble);
    findRenderedComponentWithType(instance, Input);
  });

  it('should trigger onEntryFinished with entered url when press enter key', function () {
    const onEntryFinished = spy();
    instance = renderIntoDocument(<UrlInput onEntryFinished={ onEntryFinished }/>);
    const input = findRenderedComponentWithType(instance, Input);
    input.props.onChange({ target: { value: 'http://example.com' } });
    input.props.onKeyPress({ key: 'Enter' });
    onEntryFinished.calledWith('http://example.com').should.be.true();
  });
});
