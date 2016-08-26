import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import isMobile from 'ismobilejs';


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

export function withMobileDevice(cb) {
  isMobile.any = true;
  cb();
  isMobile.any = false;
}

export function reRender(component, element, ...args) {
  const rootEl = findDOMNode(element).parentNode;
  return render(component, rootEl, ...args);
}
