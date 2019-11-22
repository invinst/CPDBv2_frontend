import React, { PropTypes } from 'react';
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

export function withStoreContext(ComponentAAA, store) {
  class WithStoreContext extends ComponentAAA {
    getChildContext() {
      return { store };
    }
  }

  ComponentAAA.childContextTypes = { store: PropTypes.object };
  return WithStoreContext;
}

global.ga = () => {};
global.clicky= { log: () => {} };
window.Intercom = () => {};
