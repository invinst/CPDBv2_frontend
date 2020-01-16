import isMobile from 'ismobilejs';


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

global.ga = () => {};
global.clicky = { log: () => {} };
window.Intercom = () => {};
