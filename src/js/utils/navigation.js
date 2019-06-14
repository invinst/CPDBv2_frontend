export function getPageYBottomOffset() {
  return window.document.body.offsetHeight - window.pageYOffset;
}

export function scrollByBottomOffset(bottomOffset) {
  window.scrollTo(0, window.document.body.offsetHeight - bottomOffset);
}
