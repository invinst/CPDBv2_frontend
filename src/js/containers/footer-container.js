import { connect } from 'react-redux';

import Footer from 'components/footer';
import { openLegalDisclaimerModal } from 'actions/generic-modal';

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = {
  openLegalDisclaimerModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
