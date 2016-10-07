import { convertFromRaw, EditorState } from 'draft-js';
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

export const getContentStateFromFields = (fields, name) => {
  const resultField = find(fields, (field) => (field.name===name));
  return resultField || null;
};
