export function defaultConfig() {
  if (global.mocha !== undefined) {
    return { stiffness: 300, damping: 26 };
  }
  /* istanbul ignore next */
  return { stiffness: 120, damping: 17 };
}
