import { connect } from 'react-redux';

import { setYearRange } from 'actions/officer-page/social-graph';
import {
  nodesSelector, linksSelector, legendSelector, getYearRange
} from 'selectors/officer-page/social-graph';
import SocialGraphPage from 'components/officer-page/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    nodes: nodesSelector(state),
    links: linksSelector(state),
    legend: legendSelector(state),
    yearRange: getYearRange(state),
    offficerId: ownProps.offficerId
  };
}

const mapDispatchToProps = {
  setYearRange
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
