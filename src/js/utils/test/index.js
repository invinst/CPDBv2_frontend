import React, { Component, PropTypes } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { mapValues } from 'lodash';
import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import isMobile from 'ismobilejs';
import { spy } from 'sinon';


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

export function withMockGA(cb) {
  const gaSpy = spy();
  const oldGa = global.ga;
  global.ga = (...args) => {
    gaSpy();
    const fields = args[args.length - 1];
    fields.hitCallback && fields.hitCallback();
  };
  cb(gaSpy);
  global.ga = oldGa;
}

export function renderWithContext(context, component) {
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
    children: PropTypes.node
  };

  ContextWrapper.childContextTypes = mapValues(context, () => PropTypes.any);
  return renderIntoDocument(<ContextWrapper>{ component }</ContextWrapper>);
}
