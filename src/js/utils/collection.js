export function groupElements(arr, sizes) {
  let pointer = 0;
  let groups = [];

  for (let i = 0; i < sizes.length; i++) {
    groups.push(arr.slice(pointer, pointer + sizes[i]));
    pointer = pointer + sizes[i];
  }

  return groups.filter(group => group.length > 0);
}

export function moveFromIndexToIndex(arr, from, to) {
  const result = arr.slice(0);
  const element = result[from];
  result.splice(from, 1);
  result.splice(to, 0, element);
  return result;
}
