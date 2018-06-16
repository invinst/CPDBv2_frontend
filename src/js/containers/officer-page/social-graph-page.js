import { connect } from 'react-redux';

import { setYearRange } from 'actions/officer-page/social-graph';
import {
  nodesSelector, linksSelector, legendSelector, getYearRange
} from 'selectors/officer-page/social-graph';
import { getOfficerId } from 'selectors/officer-page';
import SocialGraphPage from 'components/officer-page/social-graph-page';
import { openOfficerSocialGraphPage } from 'actions/open-page';


function mapStateToProps(state) {
  return {
    nodes: nodesSelector(state),
    links: linksSelector(state),
    legend: legendSelector(state),
    yearRange: getYearRange(state),
    offficerId: getOfficerId(state)
  };
}

const mapDispatchToProps = {
  setYearRange,
  openOfficerSocialGraphPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
