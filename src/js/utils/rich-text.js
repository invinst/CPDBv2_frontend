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
