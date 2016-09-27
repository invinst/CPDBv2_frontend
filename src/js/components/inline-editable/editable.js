import React, { Component, PropTypes } from 'react';


export default class Editable extends Component {
  render() {
    const { children, editor, editorProps } = this.props;
    const { editModeOn } = this.context;

    if (editModeOn) {
      return React.createElement(editor, editorProps, children);
    }
    if (typeof children === 'string') {
      return <span>{ children }</span>;
    }
    return children;
  }
}

Editable.contextTypes = {
  editModeOn: PropTypes.bool
};

Editable.propTypes = {
  children: PropTypes.node,
  editor: PropTypes.func,
  editorProps: PropTypes.object
};
