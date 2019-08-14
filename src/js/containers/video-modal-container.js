import { connect } from 'react-redux';

import { closeVideoModal } from 'actions/video-modal';
import VideoModal from 'components/video-modal';
import { isVideoModalActive } from 'selectors/video-modal';

const mapDispatchToProps = {
  closeVideoModal,
};

function mapStateToProps(state, ownProps) {
  return {
    isVideoModalActive: isVideoModalActive(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
