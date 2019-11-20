import { connect } from 'react-redux';

import { graphDataSelector, getSocialGraphRequesting } from 'selectors/pinboard-admin-page/social-graph';
import { SocialGraphWithSpinner } from 'components/common/animated-social-graph/social-graph';


function mapStateToProps(state, ownProps) {
  const data = graphDataSelector(state, ownProps);

  return {
    ...ownProps,
    officers: data.officers,
    coaccusedData: data.coaccusedData,
    listEvent: data.listEvent,
    timelineIdx: 0,
    requesting: getSocialGraphRequesting(state),
  };
}

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphWithSpinner);
