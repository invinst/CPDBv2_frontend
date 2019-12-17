import React from 'react';
import { shallow } from 'enzyme';

import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';
import EditableTextBox from 'components/document-page/editable-text-box';


describe('EditableTextBox component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <EditableTextBox
        className='editable-textbox'
        title='Some title'
        fieldName='title'
        editWrapperStateProps={ { someProp: 'some prop' } }
      />
    );

    const title = wrapper.find('.editable-text-box-title');
    title.text().should.equal('Some title');

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    editWrapperStateProvider.props().should.containEql({ someProp: 'some prop' });

    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);

    const simpleTextEditable = hoverableEditWrapper.find(SimpleTextEditable);
    simpleTextEditable.prop('className').should.equal('editable-text-box-text');
    simpleTextEditable.prop('placeholder').should.equal('Some title');
    simpleTextEditable.prop('fieldName').should.equal('title');
  });

  it('should render with multiline correctly', function () {
    const wrapper = shallow(
      <EditableTextBox
        className='editable-textbox'
        title='Some title'
        fieldName='title'
        editWrapperStateProps={ {
          someProp: 'some prop',
          sectionEditModeOn: false,
        } }
        multiline={ true }
      />
    );

    const title = wrapper.find('.editable-text-box-title');
    title.text().should.equal('Some title');

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    editWrapperStateProvider.props().should.containEql({
      someProp: 'some prop',
      sectionEditModeOn: false,
    });

    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);

    const minimalScrollBar = hoverableEditWrapper.find(MinimalScrollBars);
    minimalScrollBar.prop('showThumb').should.be.true();
    minimalScrollBar.prop('viewClassName').should.equal('editable-text-box-scroll-view');

    const simpleTextEditable = minimalScrollBar.find(SimpleTextEditable);
    simpleTextEditable.prop('className').should.equal('editable-text-box-text-multiline');
    simpleTextEditable.prop('placeholder').should.equal('Some title');
    simpleTextEditable.prop('fieldName').should.equal('title');
  });
});
