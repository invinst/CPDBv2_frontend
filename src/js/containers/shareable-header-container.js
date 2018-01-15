import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ShareableHeader from 'components/headers/shareable-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

export default withRouter(connect(mapStateToProps, {})(ShareableHeader));
