import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Report from 'components/bottom-sheet/report';
import { updateReport, addReport, fetchReport } from 'actions/reporting-page';
import { openOfficerPage } from 'actions/bottom-sheet';
import { reportSelector } from 'selectors/bottom-sheet/report';


function mapStateToProps(state, props) {
  const { fields, id } = reportSelector(state, props);
  const { turnOffSectionEditMode } = props;
  return {
    fields,
    reportId: id,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: ownProps.id ? updateReport.bind(null, ownProps.id) : addReport,
    fetchReport,
    openOfficerPage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
