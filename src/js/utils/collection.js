export function groupElements(arr, sizes) {
  let pointer = 0;
  let groups = [];

  for (let i = 0; i < sizes.length; i++) {
    groups.push(arr.slice(pointer, pointer + sizes[i]));
    pointer = pointer + sizes[i];
  }

  return groups.filter(group => group.length > 0);
}
