import { connect } from 'react-redux';

import OfficerAddBlock from 'components/bottom-sheet/report/officer-section/officer-add-block';
import { searchOfficers } from 'actions/bottom-sheet';
import { officerSearchResultSelector } from 'selectors/bottom-sheet/report';


function mapStateToProps(state, ownProps) {
  return {
    officers: officerSearchResultSelector(state)
  };
}

const mapDispatchToProps = {
  searchOfficers
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerAddBlock);
