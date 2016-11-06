import { each, reduce } from 'lodash';


export const extractedRichTextFields = collectionName => collection => reduce(
  collection,
  (result, obj) => {
    each(obj.fields, field => {
      if (field.type === 'rich_text') {
        result[`${collectionName(obj)}.${field.name}`] = field.value;
      }
    });
    return result;
  },
  {}
);

export const extractedReportRichTextFields = extractedRichTextFields(report => `reports.${report.id}`);

export const replaceRichTextFields = (collectionName, fields, contentStates) => {
  each(fields, field => {
    if (field.type === 'rich_text') {
      field.value = contentStates[`${collectionName}.${field.name}`];
    }
  });
};

export const replaceReportRichTextFields = (report, contentStates) =>
  replaceRichTextFields(`reports.${report.id}`, report.fields, contentStates);

export function getOffsetKey(node) {
  let offsetKey = null;
  if (node.getAttribute) {
    offsetKey = node.getAttribute('data-offset-key');
  }
  while (offsetKey === null && node.parentNode && node.parentNode.getAttribute) {
    node = node.parentNode;
    offsetKey = node.getAttribute('data-offset-key');
  }
  return offsetKey;
}
