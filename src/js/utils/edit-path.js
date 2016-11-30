export function editMode(pathname) {
  const nonEditPart = pathname.match(/^(?:\/?edit)?\/?(.*)$/)[1];
  return `/edit/${nonEditPart}`;
}
