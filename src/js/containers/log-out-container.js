import { connect } from 'react-redux';

import LogOutButton from 'components/log-out-button';
import { showLogOutButton } from 'selectors/log-out';
import { logOut } from 'actions/authentication';


function mapStateToProps(state, ownProps) {
  return {
    show: showLogOutButton(state, ownProps)
  };
}

const mapDispatchToProps = {
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOutButton);
