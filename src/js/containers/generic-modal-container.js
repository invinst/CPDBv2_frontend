import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GenericModal from 'components/generic-modal';
import { openRequestDocumentModal, closeModal } from 'actions/generic-modal';


function mapStateToProps(state, ownProps) {
  return {
    activeModal: state.genericModal.activeModal,
  };
}

const mapDispatchToProps = {
  openRequestDocumentModal,
  closeModal
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenericModal));
