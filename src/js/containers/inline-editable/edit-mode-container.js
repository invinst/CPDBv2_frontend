import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


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
  const { editModeOn } = state;

  return {
    ...ownProps,
    editModeOn
  };
}

export default connect(mapStateToProps, null)(EditModeComponent);
