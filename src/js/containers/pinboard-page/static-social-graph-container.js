import { connect } from 'react-redux';

import { graphDataSelector, getSocialGraphRequesting } from 'selectors/pinboard-page/social-graph';
import { SocialGraphWithSpinner } from 'components/common/animated-social-graph/social-graph';


function mapStateToProps(state, ownProps) {
  const data = graphDataSelector(ownProps.pinboardId)(state);

  return {
    ...ownProps,
    officers: data.officers,
    coaccusedData: data.coaccusedData,
    listEvent: data.listEvent,
    timelineIdx: data.listEvent.length - 1,
    requesting: getSocialGraphRequesting(state),
  };
}

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphWithSpinner);
