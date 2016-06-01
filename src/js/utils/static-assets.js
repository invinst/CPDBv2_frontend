export function imgUrl(path) {
  if (global.DEVELOPMENT) {
    return `/src/img/${path}`;
  } else {
    return `/dist/img/${path}`;
  }
}
