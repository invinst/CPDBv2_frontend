import { connect } from 'react-redux';

import App from 'components/app';
import { receiveTokenFromCookie } from 'actions/authentication';
import showLoginModalSelector from 'selectors/login-modal/show-login-modal';
import { toggleEditMode } from 'actions/inline-editable/edit-mode';
import { toggleSearchMode, changeSearchQuery } from 'actions/search-page';
import editModeOnSelector from 'selectors/edit-mode-on';
import { openLegalDisclaimerModal } from 'actions/generic-modal';


function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    appContent: state.appContent,
    showLoginModal: showLoginModalSelector(state, ownProps),
    editModeOn: editModeOnSelector(state, ownProps),
    headerBackLink: state.headerBackLink,
  };
}

const mapDispatchToProps = {
  receiveTokenFromCookie,
  toggleEditMode,
  toggleSearchMode,
  changeSearchQuery,
  openLegalDisclaimerModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
