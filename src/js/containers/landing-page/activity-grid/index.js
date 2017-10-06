import { connect } from 'react-redux';

import ActivityGrid from 'components/landing-page/activity-grid';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state, ownProps)
  };
}

const mapDispatchToProps = {
  requestActivityGrid
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityGrid);
