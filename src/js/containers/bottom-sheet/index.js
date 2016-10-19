import { connect } from 'react-redux';

import BottomSheet from 'components/bottom-sheet';
import { closeBottomSheet } from 'actions/bottom-sheet';
import contentSelector from 'selectors/bottom-sheet-selector';


function mapStateToProps(state, props) {
  const content = contentSelector(state);
  return {
    content: content,
    open: content !== null
  };
}

const mapDispatchToProps = {
  onClose: closeBottomSheet
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BottomSheet
);
