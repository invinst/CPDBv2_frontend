import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditModeProvider from 'components/edit-mode-provider';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  return {
    editModeOn: editModeOnSelector(state, ownProps),
  };
}

export default withRouter(connect(mapStateToProps, null)(EditModeProvider));
