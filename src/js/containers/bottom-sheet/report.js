import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Report from 'components/bottom-sheet/report';
import { updateReport, addReport } from 'actions/reporting-page';


function mapStateToProps(state, { fields, turnOffSectionEditMode, id }) {
  return {
    fields,
    reportId: id,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: ownProps.id ? updateReport.bind(null, ownProps.id) : addReport
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
