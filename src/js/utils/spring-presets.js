export function defaultConfig() {
  if (global.mocha !== undefined) {
    return { stiffness: 300, damping: 26 };
  }
  /* istanbul ignore next */
  return { stiffness: 120, damping: 17 };
}

export function slower() {
  /* istanbul ignore next */
  return { stiffness: 300, damping: 100 };
}
