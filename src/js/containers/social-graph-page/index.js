import { connect } from 'react-redux';

import SocialGraphPage from 'components/social-graph-page';
import { requestSocialGraph } from 'actions/social-graph-page';
import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
} from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    title: ownProps.location.query['title'],
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
  };
}

const mapDispatchToProps = {
  requestSocialGraph
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
