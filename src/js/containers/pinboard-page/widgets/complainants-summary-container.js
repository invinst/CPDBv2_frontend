import { connect } from 'react-redux';

import {
  complainantsSummarySelector,
  getComplainantsSummaryRequesting,
} from 'selectors/pinboard-page/widgets/complainants-summary';
import { DemographicWidgetWithSpinner } from 'components/common/pinboard/widgets/demographic-widget';


function mapStateToProps(state, ownProps) {
  return {
    requesting: getComplainantsSummaryRequesting(state),
    demographicData: complainantsSummarySelector(state),
  };
}

export default connect(mapStateToProps)(DemographicWidgetWithSpinner);
