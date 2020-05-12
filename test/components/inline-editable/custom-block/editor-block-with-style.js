import React from 'react';
import { mount } from 'enzyme';
import { EditorBlock } from 'draft-js';
import { stub } from 'sinon';

import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';


describe('EditorBlockWithStyle component', function () {
  it('should render with given props', function () {
    stub(EditorBlock.prototype, 'componentDidMount');
    stub(EditorBlock.prototype, '_renderChildren').returns([<div key='test-element'/>]);
    const style = { color: 'blue' };
    const child = <div className='test-editor-block-with-style-child'>some text</div>;
    const wrapper = mount(
      <EditorBlockWithStyle
        offsetKey='abc'
        blockProps={ {
          style,
          element: 'div',
          child: child,
        } }
      />
    );
    const editor = wrapper.find('div').at(0);
    editor.type().should.equal('div');
    editor.prop('data-offset-key').should.equal('abc');
    editor.prop('style').color.should.equal('blue');
    editor.childAt(0).type().should.equal('div');
    wrapper.find('.test-editor-block-with-style-child').exists().should.be.true();
  });
});
