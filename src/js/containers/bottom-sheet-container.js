import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';


import BottomSheet from 'components/bottom-sheet/bottom-sheet';
import { closeBottomSheet } from 'actions/bottom-sheet';


export class BottomSheetContainer extends Component {
  render() {
    const { closeBottomSheet, open } = this.props;
    return (
      <BottomSheet onClose={ closeBottomSheet } open={ open }/>
    );
  }
}

BottomSheetContainer.propTypes = {
  closeBottomSheet: PropTypes.func.isRequired,
  open: PropTypes.bool
};

function mapStateToProps(state, props) {
  return {
    open: state.bottomSheet.open
  };
}

const mapDispatchToProps = {
  closeBottomSheet
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheetContainer);
