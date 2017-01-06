import React from 'react';
import { render } from 'react-dom';
import should from 'should';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import draftJs from 'draft-js';
import { spy } from 'sinon';

import { ENTITY_LINK } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import { convertContentStateToEditorState } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';
import ToolbarButton from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';
import UrlInput from 'components/inline-editable/rich-text-editor/toolbar/url-input';

describe('Toolbar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render when show is true', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState }/>);
    scryRenderedComponentsWithType(instance, ToolbarButton).length.should.eql(3);
    findRenderedComponentWithType(instance, Bubble);
  });

  it('should render nothing when show is false', function () {
    instance = renderIntoDocument(<Toolbar show={ false }/>);
    instance.should.displayNothing();
  });

  it('should toggle url input when click on link button', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState }/>);
    let buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    let linkButton = buttons[2];
    linkButton.props.onClick();

    // button become "active" and url input show
    linkButton.props.active.should.be.true();
    instance.state.showUrlInput.should.be.true();
    instance.state.linkActive.should.be.true();
    findRenderedComponentWithType(instance, UrlInput);

    linkButton.props.onClick();

    // button become "inactive" and url input stop showing
    linkButton.props.active.should.be.false();
    instance.state.showUrlInput.should.be.false();
    instance.state.showUrlInput.should.be.false();
    scryRenderedComponentsWithType(instance, UrlInput).length.should.eql(0);
  });

  it('should toggle text bold when click on bold button', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const onChange = spy();
    const rootEl = document.createElement('DIV');
    instance = render(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>, rootEl);
    let buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    let boldButton = buttons[0];
    boldButton.props.active.should.be.false();
    boldButton.props.onClick();
    editorState = onChange.args[0][0];

    editorState.getCurrentInlineStyle().get('BOLD').should.be.eql('BOLD');

    instance = render(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>, rootEl);
    boldButton = scryRenderedComponentsWithType(instance, ToolbarButton)[0];
    boldButton.props.active.should.be.true();
    boldButton.props.onClick();
    editorState = onChange.args[1][0];

    should.not.exists(editorState.getCurrentInlineStyle().get('BOLD'));
  });

  it('should toggle text italic when click on italic button', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const onChange = spy();
    const rootEl = document.createElement('DIV');
    instance = render(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>, rootEl);
    let buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    let italicButton = buttons[1];
    italicButton.props.active.should.be.false();
    italicButton.props.onClick();
    editorState = onChange.args[0][0];

    editorState.getCurrentInlineStyle().get('ITALIC').should.be.eql('ITALIC');

    instance = render(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>, rootEl);
    italicButton = scryRenderedComponentsWithType(instance, ToolbarButton)[1];
    italicButton.props.active.should.be.true();
    italicButton.props.onClick();
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
    const entityKey = draftJs.Entity.create(ENTITY_LINK, 'MUTABLE', { url: 'http://example.com' });
    editorState = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);

    const onChange = spy();
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>);
    let buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    let linkButton = buttons[2];
    linkButton.props.onClick();

    // link entity should be removed
    editorState = onChange.args[0][0];
    const contentBlock = editorState.getCurrentContent().getFirstBlock();
    should.not.exist(contentBlock.getEntityAt(1));
  });

  it('should create link entity when input entry finished', function () {
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const onChange = spy();
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>);
    instance.setState({ 'showUrlInput': true });
    const input = findRenderedComponentWithType(instance, UrlInput);
    input.props.onEntryFinished('abc');
    instance.state.showUrlInput.should.be.false();
    instance.state.linkActive.should.be.true();

    // link entity should be created
    editorState = onChange.args[0][0];
    const contentBlock = editorState.getCurrentContent().getFirstBlock();
    contentBlock.getEntityAt(1).should.be.ok();
  });

  it('should not create link entity if there\'s no url given', function () {
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const onChange = spy();
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>);
    instance.setState({ 'showUrlInput': true });
    const input = findRenderedComponentWithType(instance, UrlInput);
    input.props.onEntryFinished(null);
    instance.state.showUrlInput.should.be.false();
    instance.state.linkActive.should.be.false();

    // no changes made to editorState
    should.not.exist(onChange.args[0]);
  });

  it('should reset linkActive to false when received new editorState', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build()
    );
    const rootEl = document.createElement('DIV');
    instance = render(<Toolbar show={ true } editorState={ editorState }/>, rootEl);
    instance.setState({ linkActive: true, showUrlInput: true });
    editorState = draftJs.EditorState.createEmpty();
    instance = render(<Toolbar show={ true } editorState={ editorState }/>, rootEl);
    instance.state.linkActive.should.be.false();
    instance.state.showUrlInput.should.be.false();
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

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 }/>
    );
    const bubble = findRenderedComponentWithType(instance, Bubble);
    bubble.props.style.top.should.eql(`${rect.top - 60}px`);
    bubble.props.style.left.should.eql(`${rect.left + (rect.width - 150) / 2}px`);
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

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 }/>
    );
    const bubble = findRenderedComponentWithType(instance, Bubble);
    should.not.exists(bubble.props.style.top);
    should.not.exists(bubble.props.style.left);
  });
});
