import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { EditorBlock } from 'draft-js';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';


describe('EditorBlockWithStyle component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with given props', function () {
    stub(EditorBlock.prototype, 'componentDidMount');
    stub(EditorBlock.prototype, '_renderChildren').returns(<div/>);
    const style = { color: 'blue' };
    instance = renderIntoDocument(
      <EditorBlockWithStyle
        offsetKey='abc'
        blockProps={ {
          style,
          element: 'div'
        } }/>
    );
    const divEl = findDOMNode(instance);
    divEl.tagName.should.eql('DIV');
    divEl.getAttribute('data-offset-key').should.eql('abc');
    divEl.style.getPropertyValue('color').should.eql('blue');
    divEl.children[0].tagName.should.eql('DIV');
    EditorBlock.prototype._renderChildren.restore();
    EditorBlock.prototype.componentDidMount.restore();
  });
});
