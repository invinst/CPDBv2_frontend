import { connect } from 'react-redux';

import OfficersByAllegation from 'components/landing-page/officers-by-allegation';
import { cardsSelector } from 'selectors/landing-page/officers-by-allegation';
import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  requestOfficersByAllegation
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficersByAllegation);
