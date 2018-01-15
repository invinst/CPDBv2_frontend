export function pluralize(word, count) {
  if (typeof count !== 'undefined' && count <= 1) {
    return word;
  }

  // GROSSLY naive logic. Works for our current narrow use case.
  // Feel free to improve when you need to use it in possible edge cases.
  return `${word}s`;
}
