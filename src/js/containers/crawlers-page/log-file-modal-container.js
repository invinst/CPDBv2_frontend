import { connect } from 'react-redux';

import { closeModal } from 'actions/generic-modal';
import { currentCrawler } from 'selectors/crawlers-page';
import LogFileModalContent from 'components/generic-modal/log-file-modal-content';


const mapStateToProps = (state, ownProps) => {
  return {
    crawler: currentCrawler(state),
  };
};

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogFileModalContent);
