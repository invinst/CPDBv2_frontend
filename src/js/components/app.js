import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';

import { getMockAdapter } from 'mock-data';
import configureStore from 'store';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import BottomSheetContainer from 'containers/bottom-sheet-container';
import Header from 'components/header';
import RouteTransition from 'components/animation/route-transition';
import LoginModalContainer from 'containers/login-modal-container';
import {
  openSignInModal, closeSignInModal, receiveTokenFromCookie
} from 'actions/authentication';
import Mousetrap from 'mousetrap';


const store = configureStore();

export default class App extends React.Component {
  getChildContext() {
    return { adapter: getMockAdapter() };
  }

  componentDidMount() {
    store.dispatch(receiveTokenFromCookie());
    Mousetrap.bind('esc', () => {
      const show = store.getState().authentication.showLoginModal;
      store.dispatch(show ? closeSignInModal() : openSignInModal());
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <Provider store={ store }>
        <StyleRoot>
          <EditModeContainer pathname={ pathname }>
            <Header pathname={ pathname }/>
            <RouteTransition pathname={ pathname }>
              { this.props.children }
            </RouteTransition>
            <BottomSheetContainer/>
            <LoginModalContainer/>
          </EditModeContainer>
        </StyleRoot>
      </Provider>
    );
  }
}

App.childContextTypes = {
  adapter: PropTypes.func
};

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};
