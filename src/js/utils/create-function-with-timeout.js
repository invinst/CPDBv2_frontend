export default function createFunctionWithTimeout(callback, optTimeout) {
  var called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, optTimeout || 1000);
  return fn;
}
