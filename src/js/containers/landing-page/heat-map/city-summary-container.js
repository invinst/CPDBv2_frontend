import { connect } from 'react-redux';

import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';
import { citySummarySelector } from 'selectors/landing-page/city-summary';


function mapStateToProps(state, props) {
  const { onClick, scrollToTopLawsuit } = props;
  return {
    citySummary: citySummarySelector(state),
    onClick,
    scrollToTopLawsuit,
  };
}

export default connect(mapStateToProps, null)(CitySummary);
