import { connect } from 'react-redux';

import RouteTransition from 'components/animation/route-transition';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pageLoading: state.pageLoading
  };
}

export default connect(mapStateToProps, null)(RouteTransition);
