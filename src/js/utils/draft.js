import { convertFromRaw, EditorState, genKey, Entity, RichUtils } from 'draft-js';
import { isEmpty, map, find } from 'lodash';
import moment from 'moment';

import defaultDecorator from 'decorators';


export const contentStateToTextArray = contentState => (
  !contentState || contentState.isEmpty() ?
    [] :
    map(contentState.getBlocksAsArray(), block => block.getText())
);

export const convertContentStateToEditorState = rawContentState => (
  isEmpty(rawContentState) ?
    EditorState.createEmpty(defaultDecorator) :
    EditorState.createWithContent(convertFromRaw(rawContentState), defaultDecorator)
);

export const getField = (fields, name) => find(fields, (field) => (field.name===name));

export const multilineTextValueToArray = multilineTextValue => (map(multilineTextValue.blocks, 'text'));

export const plainTextValueToString = plainTextValue => (
  plainTextValue.blocks[0].text
);

export const createBlock = (text='') => ({
  data: {},
  depth: 0,
  entityRanges: [],
  inlineStyleRanges: [],
  key: genKey(),
  type: 'unstyled',
  text
});

export const buildPlainTextField = (name, text) => ({
  name,
  type: 'plain_text',
  value: {
    blocks: [createBlock(text)],
    entityMap: {}
  }
});

export const createEmptyEditorState = () => ({
  blocks: [createBlock()],
  entityMap: {}
});

export const createFieldWithEmptyEditorState = (name, type) => ({
  name,
  type,
  value: createEmptyEditorState()
});

export const createEmptyStringField = (name, type='string') => ({
  name,
  type,
  value: ''
});

export const createEmptyDateField = (name) => ({
  name,
  type: 'date',
  value: moment().format('YYYY-MM-DD')
});

export const getFieldOrCreateEmptyWithEditorState = (fields, name, type) => (
  getField(fields, name)
  || createFieldWithEmptyEditorState(name, type));

export const linkEntitySelected = (editorState) => {
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getAnchorKey();
  const contentBlock = editorState.getCurrentContent().getBlockForKey(blockKey);

  const entityKey = contentBlock.getEntityAt(selectionState.getAnchorOffset());

  if (entityKey != null) {
    const entity = Entity.get(entityKey);

    return entity.getType() === 'LINK';
  }

  return false;
};

export const inlineStyleSelected = (editorState, type) => {
  return !!editorState.getCurrentInlineStyle().get(type);
};

export const createLinkEntity = (editorState, data) => {
  const entityKey = Entity.create('LINK', 'MUTABLE', data);
  return RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
};

export const removeLinkEntity = (editorState) =>
  RichUtils.toggleLink(editorState, editorState.getSelection(), null);

export const getSelectionStartBlockKey = editorState => {
  const selectionState = editorState.getSelection();
  return selectionState.getStartKey();
};

export const removeSelection = (editorState) => {
  let selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  selectionState = selectionState
    .set('anchorOffset', 0)
    .set('focusOffset', 0)
    .set('focusKey', anchorKey);
  editorState = EditorState.acceptSelection(editorState, selectionState);
  return editorState;
};

export const hasSelection = (editorState) => {
  const selectionState = editorState.getSelection();
  return (selectionState.getStartOffset() != selectionState.getEndOffset()) ||
    (selectionState.getStartKey() != selectionState.getEndKey());
};
