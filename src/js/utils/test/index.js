import React from 'react';
import isMobile from 'ismobilejs';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';


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

export function mountWithRouter(node, options) {
  return mount(<MemoryRouter>{ node }</MemoryRouter>, options);
}

global.ga = () => {};
global.clicky = { log: () => {} };
window.Intercom = () => {};
