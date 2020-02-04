import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import App from 'components/app';
import { receiveTokenFromCookie } from 'actions/authentication';
import showLoginModalSelector from 'selectors/login-modal/show-login-modal';
import { toggleEditMode } from 'actions/inline-editable/edit-mode';
import { toggleSearchMode, changeSearchQuery } from 'actions/search-page';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    showLoginModal: showLoginModalSelector(state, ownProps),
    editModeOn: editModeOnSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  receiveTokenFromCookie,
  toggleEditMode,
  toggleSearchMode,
  changeSearchQuery,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
