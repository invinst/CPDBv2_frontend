import { connect } from 'react-redux';

import App from 'components/app';
import { receiveTokenFromCookie } from 'actions/authentication';
import showLoginModalSelector from 'selectors/login-modal/show-login-modal';
import { toggleEditMode } from 'actions/inline-editable/edit-mode';
import { toggleSearchMode, changeSearchQuery } from 'actions/search-page';
import { fetchPage } from 'actions/cms';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    appContent: state.appContent,
    showLoginModal: showLoginModalSelector(state, ownProps),
    editModeOn: editModeOnSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchCMSContent: fetchPage('landing-page'),
  receiveTokenFromCookie,
  toggleEditMode,
  toggleSearchMode,
  changeSearchQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
