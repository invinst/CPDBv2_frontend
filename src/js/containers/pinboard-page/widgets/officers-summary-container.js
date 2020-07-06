import { connect } from 'react-redux';

import {
  officersSummarySelector,
  getOfficersSummaryRequesting,
} from 'selectors/pinboard-page/widgets/officers-summary';
import { DemographicWidgetWithSpinner } from 'components/common/pinboard/widgets/demographic-widget';


function mapStateToProps(state, ownProps) {
  return {
    requesting: getOfficersSummaryRequesting(state),
    demographicData: officersSummarySelector(state),
  };
}

export default connect(mapStateToProps)(DemographicWidgetWithSpinner);
