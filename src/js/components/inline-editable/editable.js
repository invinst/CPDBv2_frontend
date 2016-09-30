import React, { Component, PropTypes } from 'react';


export default class Editable extends Component {
  render() {
    const { children, editor, editorProps, editModeOn, presenter, presenterProps } = this.props;

    if (editModeOn) {
      return React.createElement(editor, editorProps, children);
    }
    if (typeof children === 'string') {
      return <span>{ children }</span>;
    }

    if (presenter) {
      return React.createElement(presenter, presenterProps, children);
    }

    return children || null;
  }
}

Editable.propTypes = {
  children: PropTypes.node,
  editor: PropTypes.func,
  editorProps: PropTypes.object,
  editModeOn: PropTypes.bool,
  presenter: PropTypes.func,
  presenterProps: PropTypes.object
};
