import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import draftJs from 'draft-js';
import { spy } from 'sinon';

import { ENTITY_LINK } from 'utils/constants';
import { convertContentStateToEditorState, createLinkEntity, removeLinkEntity } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';
import ToolbarButton from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';
import UrlInput from 'components/inline-editable/rich-text-editor/toolbar/url-input';

describe('Toolbar component', function () {
  it('should render when show is true', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }/>
    );
    wrapper.find(ToolbarButton).should.have.length(3);
    wrapper.find(Bubble).exists().should.be.true();
  });

  it('should render nothing when show is false', function () {
    const wrapper = shallow(
      <Toolbar show={ false }/>
    );
    should(wrapper.type()).be.null();
  });

  it('should toggle url input when click on link button', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const wrapper = mount(
      <Toolbar show={ true } editorState={ editorState }/>
    );
    let linkButton = wrapper.find(ToolbarButton).at(2);
    linkButton.prop('onClick')();
    wrapper.update();
    linkButton = wrapper.find(ToolbarButton).at(2);

    // button become "active" and url input show
    linkButton.prop('active').should.be.true();
    wrapper.state('linkActive').should.be.true();
    wrapper.find(UrlInput).exists().should.be.true();

    linkButton.prop('onClick')();
    wrapper.update();
    linkButton = wrapper.find(ToolbarButton).at(2);

    // button become "inactive" and url input stop showing
    linkButton.prop('active').should.be.false();
    wrapper.find(UrlInput).exists().should.be.false();
  });

  it('should toggle text bold when click on bold button', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const onChange = spy();
    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>
    );
    let buttons = wrapper.find(ToolbarButton);
    let boldButton = buttons.at(0);
    boldButton.prop('active').should.be.false();
    boldButton.prop('onClick')();
    editorState = onChange.args[0][0];

    editorState.getCurrentInlineStyle().get('BOLD').should.equal('BOLD');
    wrapper.setProps({
      show: true,
      editorState,
      onChange,
    });
    boldButton = wrapper.find(ToolbarButton).at(0);
    boldButton.prop('active').should.be.true();
    boldButton.prop('onClick')();
    editorState = onChange.args[1][0];

    should.not.exists(editorState.getCurrentInlineStyle().get('BOLD'));
  });

  it('should toggle text italic when click on italic button', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const onChange = spy();

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>
    );
    let buttons = wrapper.find(ToolbarButton);
    let italicButton = buttons.at(1);
    italicButton.prop('active').should.be.false();
    italicButton.prop('onClick')();
    editorState = onChange.args[0][0];

    editorState.getCurrentInlineStyle().get('ITALIC').should.equal('ITALIC');

    wrapper.setProps({
      show: true,
      editorState,
      onChange,
    });
    italicButton = wrapper.find(ToolbarButton).at(1);
    italicButton.prop('active').should.be.true();
    italicButton.prop('onClick')();
    editorState = onChange.args[1][0];

    should.not.exists(editorState.getCurrentInlineStyle().get('ITALIC'));
  });

  it('should remove link entity from selection if click on link button', function () {
    // create editorState with link entity
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
    contentState.createEntity(ENTITY_LINK, 'MUTABLE', { url: 'http://example.com' });
    editorState = draftJs.RichUtils.toggleLink(
      editorState, editorState.getSelection(), contentState.getLastCreatedEntityKey()
    );

    const onChange = spy();
    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>
    );
    wrapper.setState({ 'urlInputValue': 'abc' });

    let buttons = wrapper.find(ToolbarButton);
    let linkButton = buttons.at(2);
    linkButton.prop('onClick')();

    // link entity should be removed
    editorState = onChange.args[0][0];
    const contentBlock = editorState.getCurrentContent().getFirstBlock();
    should.not.exist(contentBlock.getEntityAt(1));
  });

  it('should not create link entity if there\'s no url given', function () {
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const onChange = spy();
    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>
    );
    wrapper.setState({ 'urlInputValue': null });
    wrapper.state('linkActive').should.be.false();

    // no changes made to editorState
    should.not.exist(onChange.args[0]);
  });

  it('should reset linkActive to false when received new editorState', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }/>
    );
    wrapper.setState({ linkActive: true });
    editorState = draftJs.EditorState.createEmpty();

    wrapper.setProps({
      show: true,
      editorState,
    });
    wrapper.state('linkActive').should.be.false();
  });

  it('should give correct position style to bubble', function () {
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let editorState = draftJs.EditorState.createWithContent(contentState);
    const blockKey = editorState.getCurrentContent().getFirstBlock().getKey();

    // create a div with some text and selection
    const divEl = document.createElement('DIV');
    document.body.appendChild(divEl);
    divEl.setAttribute('data-offset-key', `${blockKey}-0-0`);
    divEl.appendChild(document.createTextNode('abc'));
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(divEl, 0);
    range.setEnd(divEl, 1);
    selection.addRange(range);
    const rect = range.getBoundingClientRect();

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 }/>
    );
    const bubble = wrapper.find(Bubble);
    bubble.prop('style').top.should.eql(`${rect.top - 60}px`);
    bubble.prop('style').left.should.eql(`${rect.left + (rect.width - 150) / 2}px`);
  });

  it('should not give any position style to bubble if not selecting correct element', function () {
    const contentState = draftJs.ContentState.createFromText('abc');
    let editorState = draftJs.EditorState.createWithContent(contentState);

    // create a div with some text and selection but not with data-offset-key
    const divEl = document.createElement('DIV');
    document.body.appendChild(divEl);
    divEl.appendChild(document.createTextNode('abc'));
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(divEl, 0);
    range.setEnd(divEl, 1);
    selection.addRange(range);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 }/>
    );
    const bubble = wrapper.find(Bubble);
    should.not.exists(bubble.prop('style').top);
    should.not.exists(bubble.prop('style').left);
  });

  it('should create link entity if url input not empty', function () {
    const onChange = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const wrapper = mount(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onChange={ onChange }/>
    );
    wrapper.setState({ linkActive: true });

    const urlInput = wrapper.find(UrlInput);
    urlInput.prop('onChange')('http://example.com');

    editorState = onChange.args[0][0];

    const entity = editorState.getCurrentContent().getFirstBlock().getEntityAt(1);
    const linkInstance = contentState.getEntity(entity);
    const { url } = linkInstance.getData();

    url.should.equal('http://example.com');
  });

  it ('should remove link entity if url input empty', function () {
    const onChange = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onChange={ onChange }/>
    );
    wrapper.setState({ linkActive: true });

    const urlInput = wrapper.find(UrlInput);
    urlInput.prop('onChange')('');

    editorState = onChange.args[0][0];
    const entity = editorState.getCurrentContent().getFirstBlock().getEntityAt(1);

    should.not.exist(entity);
  });

  it('should handle focus on mouse over', function () {
    const onFocus = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    const editorState = draftJs.EditorState.createWithContent(contentState);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onFocus={ onFocus }/>
    );

    const buttons = wrapper.find(ToolbarButton);
    const boldButton = buttons.at(0);

    boldButton.prop('onMouseOver')();

    onFocus.should.be.called();
  });

  it('should handle blur on mouse out', function () {
    const onBlur = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    const editorState = draftJs.EditorState.createWithContent(contentState);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onBlur={ onBlur }/>
    );

    const buttons = wrapper.find(ToolbarButton);
    const boldButton = buttons.at(0);

    boldButton.prop('onMouseOut')();

    onBlur.should.be.called();
  });

  it('should handle focus if url input is focus', function () {
    const onFocus = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onFocus={ onFocus }/>
    );
    wrapper.setState({ linkActive: true });

    const urlInput = wrapper.find(UrlInput);
    urlInput.prop('onFocus')('');

    onFocus.should.be.called();
  });

  it('should handle blur if url input is blur', function () {
    const onBlur = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const wrapper = shallow(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onBlur={ onBlur }/>
    );
    wrapper.setState({ linkActive: true });

    const urlInput = wrapper.find(UrlInput);
    urlInput.prop('onBlur')('');

    onBlur.should.be.called();
  });

  it('should activate link button if a link entity is selected', function () {
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const wrapper = shallow(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
    );

    editorState = createLinkEntity(editorState, { url: 'http://abc.com' });

    wrapper.setProps({
      show: true,
      parentTop: 0,
      parentLeft: 0,
      editorState,
    });
    wrapper.state('urlInputValue').should.equal('http://abc.com');
    wrapper.state('linkActive').should.be.true();
  });

  it('should deactivate link button if a link entity is not selected', function () {
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
    editorState = createLinkEntity(editorState, { url: 'http://abc.com' });

    const wrapper = shallow(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
    );

    editorState = removeLinkEntity(editorState);

    wrapper.setProps({
      show: true,
      parentTop: 0,
      parentLeft: 0,
      editorState,
    });
    wrapper.state('urlInputValue').should.equal('');
    wrapper.state('linkActive').should.be.false();
  });
});
