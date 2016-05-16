import { unmountComponentAtNode, findDOMNode } from 'react-dom';


export function unmountComponentSuppressError(element) {
  try {
    unmountComponentAtNode(findDOMNode(element).parentNode);
  } catch (err) {
    // ignore any error
  }
}

export function withAnimationDisabled(cb) {
  global.disableAnimation = true;
  cb();
  global.disableAnimation = false;
}
