import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Report from 'components/bottom-sheet/report';
import { searchOfficers } from 'actions/bottom-sheet';
import { updateReport, addReport, fetchReport } from 'actions/reporting-page';
import { officerSearchResultSelector } from 'selectors/bottom-sheet';


function mapStateToProps(state, { fields, turnOffSectionEditMode, id }) {
  return {
    fields,
    reportId: id,
    turnOffSectionEditMode,
    officerSearchResult: officerSearchResultSelector(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: ownProps.id ? updateReport.bind(null, ownProps.id) : addReport,
    fetchReport,
    searchOfficers
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
