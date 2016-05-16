export function imgRootFolder() {
  if (global.DEVELOPMENT) {
    return '/src/img/';
  } else {
    return '/dist/';
  }
}
