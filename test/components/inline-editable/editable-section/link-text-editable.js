import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import Editable from 'components/inline-editable/editable';
import { unmountComponentSuppressError } from 'utils/test';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import * as draftUtils from 'utils/draft';
import { renderWithContext } from 'utils/test';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { convertContentStateToEditorState } from 'utils/draft';

describe('LinkTextEditable component', function () {
  let instance;
  let editorState;

  beforeEach(function () {
    stub(draftUtils, 'editorStateToText').returns('link text');
    editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    draftUtils.editorStateToText.restore();
  });

  it('should render empty link if value is not passed', function () {
    instance = renderIntoDocument(
      <LinkTextEditable />
    );

    const editableElement = findRenderedComponentWithType(instance, Editable);
    const linkElement = editableElement.props.presenterElement;
    should(linkElement.props.children).be.null();
  });

  it('should render text extracted from editor state when value is passed', function () {
    instance = renderIntoDocument(
      <LinkTextEditable
        value={ editorState }
      />
    );

    const editableElement = findRenderedComponentWithType(instance, Editable);
    const linkElement = editableElement.props.presenterElement;
    linkElement.props.children.should.be.equal('link text');
    draftUtils.editorStateToText.calledWith(editorState).should.be.true();
  });

  it('should get editor props when they are available in props', function () {
    const onChangeSpy = spy();
    instance = renderIntoDocument(
      <LinkTextEditable
        value={ editorState }
        editModeOn={ true }
        onChange={ onChangeSpy }
      />
    );

    const editableElement = findRenderedComponentWithType(instance, Editable);
    editableElement.props.editModeOn.should.be.true();
    editableElement.props.editorElement.props.should.containEql({
      editorState: editorState,
      onChange: onChangeSpy,
    });
  });

  it('should get editor props from context when they are not available in props', function () {
    const onChangeSpy = spy();
    instance = renderWithContext(
      {
        fieldContexts: {
          'navbar_title': {
            editModeOn: true,
            value: editorState,
            onChange: onChangeSpy,
          },
        },
      },
      <LinkTextEditable fieldname='navbar_title' />
    );

    const editableElement = findRenderedComponentWithType(instance, Editable);
    editableElement.props.editModeOn.should.be.true();
    editableElement.props.editorElement.props.should.containEql({
      editorState: editorState,
      onChange: onChangeSpy,
    });
  });
});
