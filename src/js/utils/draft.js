import { convertFromRaw, EditorState, genKey } from 'draft-js';
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

export const getField = (fields, name) => {
  const resultField = find(fields, (field) => (field.name===name));
  return resultField || null;
};

export const multilineTextValueToArray = multilineTextValue => (map(multilineTextValue.blocks, 'text'));

export const plainTextValueToString = plainTextValue => (
  plainTextValue.blocks[0].text
);

export const buildPlainTextField = (name, text) => ({
  name,
  type: 'plain_text',
  value: {
    blocks: [{
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      key: genKey(),
      text
    }],
    entityMap: {}
  }
});
