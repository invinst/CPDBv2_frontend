import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';


import BottomSheet from 'components/bottom-sheet/bottom-sheet';
import { closeBottomSheet } from 'actions/bottom-sheet';


export class BottomSheetContainer extends Component {
  render() {
    const { closeBottomSheet, content } = this.props;
    return (
      <BottomSheet onClose={ closeBottomSheet } open={ content !== null } content={ content }/>
    );
  }
}

BottomSheetContainer.propTypes = {
  closeBottomSheet: PropTypes.func.isRequired,
  content: PropTypes.object
};

function mapStateToProps(state, props) {
  return {
    content: state.bottomSheet.content
  };
}

const mapDispatchToProps = {
  closeBottomSheet
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheetContainer);
