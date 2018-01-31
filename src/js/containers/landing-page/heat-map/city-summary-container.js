import { connect } from 'react-redux';

import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';
import { citySummarySelector } from 'selectors/landing-page/city-summary';
import { getCitySummary } from 'actions/landing-page/city-summary';


function mapStateToProps(state, props) {
  const { onClick } = props;
  return {
    citySummary: citySummarySelector(state),
    onClick
  };
}

const mapDispatchToProps = {
  getCitySummary
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySummary);
