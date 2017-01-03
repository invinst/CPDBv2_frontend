import React from 'react';
import { render } from 'react-dom';
import should from 'should';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import draftJs, { Entity } from 'draft-js';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { convertContentStateToEditorState, createLinkEntity, removeLinkEntity } from 'utils/draft';
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
    instance.state.linkActive.should.be.true();
    findRenderedComponentWithType(instance, UrlInput);

    linkButton.props.onClick();

    // button become "inactive" and url input stop showing
    linkButton.props.active.should.be.false();
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
    const entityKey = draftJs.Entity.create('LINK', 'MUTABLE', { url: 'http://example.com' });
    editorState = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);

    const onChange = spy();
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>);
    instance.setState({ 'urlInputValue': 'abc' });

    let buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    let linkButton = buttons[2];
    linkButton.props.onClick();

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
    instance = renderIntoDocument(<Toolbar show={ true } editorState={ editorState } onChange={ onChange }/>);
    instance.setState({ 'urlInputValue': null });
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
    instance.setState({ linkActive: true });
    editorState = draftJs.EditorState.createEmpty();
    instance = render(<Toolbar show={ true } editorState={ editorState }/>, rootEl);
    instance.state.linkActive.should.be.false();
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

  it('should create link entity if url input not empty', function () {
    const onChange = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onChange={ onChange }/>
    );
    instance.setState({ linkActive: true });

    const urlInput = findRenderedComponentWithType(instance, UrlInput);
    urlInput.props.onChange('http://example.com');

    editorState = onChange.args[0][0];

    const entity = editorState.getCurrentContent().getFirstBlock().getEntityAt(1);
    const linkInstance = Entity.get(entity);
    const { url } = linkInstance.getData();

    linkInstance.should.be.ok();
    url.should.eql('http://example.com');
  });

  it ('should remove link entity if url input empty', function () {
    const onChange = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onChange={ onChange }/>
    );
    instance.setState({ linkActive: true });

    const urlInput = findRenderedComponentWithType(instance, UrlInput);
    urlInput.props.onChange('');

    editorState = onChange.args[0][0];
    const entity = editorState.getCurrentContent().getFirstBlock().getEntityAt(1);

    should.not.exist(entity);
  });

  it('should handle focus on mouse over', function () {
    const onFocus = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    const editorState = draftJs.EditorState.createWithContent(contentState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onFocus={ onFocus }/>
    );

    const buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    const boldButton = buttons[0];

    boldButton.props.onMouseOver();

    onFocus.called.should.be.true();
  });

  it('should handle blur on mouse out', function () {
    const onBlur = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    const editorState = draftJs.EditorState.createWithContent(contentState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onBlur={ onBlur }/>
    );

    const buttons = scryRenderedComponentsWithType(instance, ToolbarButton);
    const boldButton = buttons[0];

    boldButton.props.onMouseOut();

    onBlur.called.should.be.true();
  });

  it('should handle focus if url input is focus', function () {
    const onFocus = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onFocus={ onFocus }/>
    );
    instance.setState({ linkActive: true });

    const urlInput = findRenderedComponentWithType(instance, UrlInput);
    urlInput.props.onFocus('');

    onFocus.called.should.be.true();
  });

  it('should handle blur if url input is blur', function () {
    const onBlur = spy();
    // create editorState with selection
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    instance = renderIntoDocument(
      <Toolbar show={ true } editorState={ editorState }
        parentTop={ 0 } parentLeft={ 0 } onBlur={ onBlur }/>
    );
    instance.setState({ linkActive: true });

    const urlInput = findRenderedComponentWithType(instance, UrlInput);
    urlInput.props.onBlur('');

    onBlur.called.should.be.true();
  });

  it('should activate link button if a link entity is selected', function () {
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

    const rootEl = document.createElement('DIV');
    instance = render(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
      rootEl
    );

    editorState = createLinkEntity(editorState, { url: 'http://abc.com' });

    instance = render(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
      rootEl
    );
    instance.state.urlInputValue.should.eql('http://abc.com');
    instance.state.linkActive.should.be.true();
  });

  it('should deactivate link button if a link entity is not selected', function () {
    const contentState = draftJs.ContentState.createFromText('abc');
    let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    let editorState = draftJs.EditorState.createWithContent(contentState);
    editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
    editorState = createLinkEntity(editorState, { url: 'http://abc.com' });

    const rootEl = document.createElement('DIV');
    instance = render(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
      rootEl
    );

    editorState = removeLinkEntity(editorState);

    instance = render(
      <Toolbar show={ true } parentTop={ 0 } parentLeft={ 0 } editorState={ editorState }/>,
      rootEl
    );
    instance.state.urlInputValue.should.eql('');
    instance.state.linkActive.should.be.false();
  });
});
