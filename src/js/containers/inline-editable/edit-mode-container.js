import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import S from 'string';


class EditModeComponent extends Component {
  getChildContext() {
    return {
      editModeOn: this.props.editModeOn || this.onEditPath()
    };
  }

  onEditPath() {
    return S(this.props.pathname).strip('/').s.split('/')[0] === 'edit';
  }

  render() {
    const { children } = this.props;
    return <div>{ children }</div>;
  }
}

EditModeComponent.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
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
