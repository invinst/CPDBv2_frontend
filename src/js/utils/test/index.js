import React, { Component, PropTypes } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { mapValues } from 'lodash';
import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import isMobile from 'ismobilejs';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';


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
    children: PropTypes.node
  };

  ContextWrapper.childContextTypes = mapValues(context, () => PropTypes.any);
  return <ContextWrapper>{ component }</ContextWrapper>;
}

export function renderWithContext(context, component) {
  return renderIntoDocument(wrapWithContext(context, component));
}

class Container extends Component { // eslint-disable-line react/no-multi-comp
  render() {
    const { children } = this.props;
    return children;
  }
}

Container.propTypes = {
  children: PropTypes.node
};

export function wrapInDragDropContext(component) {
  const DragAndDropContextWrapper = DragDropContext(TestBackend)(Container);
  return <DragAndDropContextWrapper>{ component }</DragAndDropContextWrapper>;
}

export function renderInDragDropContext(component) {
  return renderIntoDocument(wrapInDragDropContext(component));
}
