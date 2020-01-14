import { connect } from 'react-redux';

import UnitProfilePage from 'components/unit-profile-page';
import { summarySelector } from 'selectors/unit-profile-page';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';


const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    unitName: ownProps.match.params.unitName,
    summary: summarySelector(state),
    scrollPosition: getShareablePageScrollPosition(state),
  };
};

export default connect(mapStateToProps, null)(UnitProfilePage);
