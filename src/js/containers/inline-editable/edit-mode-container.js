import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import editModeOnSelector from 'selectors/edit-mode-on';


class EditModeComponent extends Component {
  getChildContext() {
    return {
      editModeOn: this.props.editModeOn
    };
  }

  render() {
    const { children } = this.props;
    return <div>{ children }</div>;
  }
}

EditModeComponent.propTypes = {
  children: PropTypes.node,
  editModeOn: PropTypes.bool
};

EditModeComponent.childContextTypes = {
  editModeOn: PropTypes.bool
};


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    editModeOn: editModeOnSelector(state, ownProps)
  };
}

export default connect(mapStateToProps, null)(EditModeComponent);
