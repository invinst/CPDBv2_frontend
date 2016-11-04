import { convertFromRaw, EditorState, genKey, Entity } from 'draft-js';
import { isEmpty, map, find } from 'lodash';


export const contentStateToTextArray = contentState => (
  !contentState || contentState.isEmpty() ?
    [] :
    map(contentState.getBlocksAsArray(), block => block.getText())
);

export const convertContentStateToEditorState = contentState => (
  isEmpty(contentState) ?
    EditorState.createEmpty() :
    EditorState.createWithContent(convertFromRaw(contentState))
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
  value: '1900-01-01'
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
