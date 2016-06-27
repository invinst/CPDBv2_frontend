import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';


import BottomSheet from 'components/landing-page/bottom-sheet/bottom-sheet';
import { closeBottomSheet } from 'actions/landing-page/bottom-sheet';
import { contentSelector } from 'selectors/landing-page/bottom-sheet-selector';


export class UnconnectedBottomSheetContainer extends Component {
  render() {
    const { closeBottomSheet, content } = this.props;
    return (
      <BottomSheet onClose={ closeBottomSheet } open={ content !== null } content={ content }/>
    );
  }
}

UnconnectedBottomSheetContainer.propTypes = {
  closeBottomSheet: PropTypes.func.isRequired,
  content: PropTypes.object
};

function mapStateToProps(state, props) {
  return {
    content: contentSelector(state)
  };
}

const mapDispatchToProps = {
  closeBottomSheet
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedBottomSheetContainer);
