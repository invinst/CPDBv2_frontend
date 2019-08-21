import React, { Component, PropTypes } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { mapValues } from 'lodash';
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

global.ga = () => {};
window.Intercom = () => {};

export function wrapWithContext(context, component) {
  class ContextWrapper extends Component {
    getChildContext() {
      return context;
    }
    render() {
      const { children } = this.props;
      return children;
    }
  }

  ContextWrapper.propTypes = {
    children: PropTypes.node,
  };

  ContextWrapper.childContextTypes = mapValues(context, () => PropTypes.any);
  return <ContextWrapper>{ component }</ContextWrapper>;
}

export function renderWithContext(context, component) {
  return renderIntoDocument(wrapWithContext(context, component));
}
