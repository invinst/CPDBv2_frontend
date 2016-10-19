import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Report from 'components/bottom-sheet/report';
import { updateReport } from 'actions/stories-page';


function mapStateToProps(state, { fields, turnOffSectionEditMode }) {
  return {
    fields,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: updateReport.bind(null, ownProps.id)
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
