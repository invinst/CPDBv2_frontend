import React from 'react';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import SimpleEditWrapperStateProvider from 'components/inline-editable/simple-edit-wrapper-state-provider';
import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';
import EditableTextBox from 'components/document-page/editable-text-box';


describe('EditableTextBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <EditableTextBox
        className='editable-textbox'
        title='Some title'
        fieldName='title'
        editWrapperStateProps={ { someProp: 'some prop' } }
      />
    );

    const title = findRenderedDOMComponentWithClass(instance, 'editable-text-box-title');
    title.textContent.should.eql('Some title');

    const simpleEditWrapperStateProvider = findRenderedComponentWithType(instance, SimpleEditWrapperStateProvider);
    simpleEditWrapperStateProvider.props.should.containEql({ someProp: 'some prop' });

    const hoverableEditWrapper = findRenderedComponentWithType(simpleEditWrapperStateProvider, HoverableEditWrapper);

    const simpleTextEditable = findRenderedComponentWithType(hoverableEditWrapper, SimpleTextEditable);
    simpleTextEditable.props.className.should.eql('editable-text-box-text');
    simpleTextEditable.props.placeholder.should.eql('Some title');
    simpleTextEditable.props.fieldName.should.eql('title');
  });

  it('should render with multiline correctly', function () {
    instance = renderIntoDocument(
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

    const title = findRenderedDOMComponentWithClass(instance, 'editable-text-box-title');
    title.textContent.should.eql('Some title');

    const simpleEditWrapperStateProvider = findRenderedComponentWithType(instance, SimpleEditWrapperStateProvider);
    simpleEditWrapperStateProvider.props.should.containEql({
      someProp: 'some prop',
      sectionEditModeOn: false,
    });

    const hoverableEditWrapper = findRenderedComponentWithType(simpleEditWrapperStateProvider, HoverableEditWrapper);

    const minimalScrollBar = findRenderedComponentWithType(hoverableEditWrapper, MinimalScrollBars);
    minimalScrollBar.props.showThumb.should.be.true();
    minimalScrollBar.props.viewClassName.should.be.eql('editable-text-box-scroll-view');

    const simpleTextEditable = findRenderedComponentWithType(minimalScrollBar, SimpleTextEditable);
    simpleTextEditable.props.className.should.eql('editable-text-box-text-multiline');
    simpleTextEditable.props.placeholder.should.eql('Some title');
    simpleTextEditable.props.fieldName.should.eql('title');
  });
});
