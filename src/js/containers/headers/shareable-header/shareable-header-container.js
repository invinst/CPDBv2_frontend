import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ShareableHeader from 'components/headers/shareable-header';
import { updateShareablePageScrollPosition } from 'actions/headers/shareable-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

const mapDispatchToProps = {
  updateShareablePageScrollPosition
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShareableHeader));
