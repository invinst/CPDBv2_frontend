// Browsers only render the last state since they tend to merge changes. Therefore, we need a small timeout to
// trick them into rendering the animation.
export const startAnimation = callback => {
  if (!global.mocha) {
    setTimeout(callback, 50);
  }
};
