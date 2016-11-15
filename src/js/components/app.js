import React, { PropTypes } from 'react';
import Mousetrap from 'mousetrap';
import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';

import { getMockAdapter } from 'mock-api';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import BottomSheetContainer from 'containers/bottom-sheet';
import Header from 'components/header';
import RouteTransition from 'components/animation/route-transition';
import LoginModalContainer from 'containers/login-modal-container';


export default class App extends React.Component {
  getChildContext() {
    return { adapter: getMockAdapter() };
  }

  componentDidMount() {
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
    Mousetrap.bind('esc', () => this.props.toggleEditMode(this.props.location.pathname));
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <StyleRoot>
        <EditModeContainer location={ location }>
          <Header pathname={ pathname }/>
          <RouteTransition pathname={ pathname }>
            { this.props.children }
          </RouteTransition>
          <BottomSheetContainer/>
          <LoginModalContainer location={ location }/>
        </EditModeContainer>
      </StyleRoot>
    );
  }
}

App.childContextTypes = {
  adapter: PropTypes.func
};

App.propTypes = {
  children: PropTypes.node,
  receiveTokenFromCookie: PropTypes.func,
  showLoginModal: PropTypes.bool,
  location: locationShape,
  toggleEditMode: PropTypes.func
};
