import RouteTransition from 'components/animation/route-transition';
import EditModeProvider from 'components/edit-mode-provider';
import GenericModalContainer from 'containers/generic-modal-container';
import LoginModalContainer from 'containers/login-modal-container';

import { getMockAdapter } from 'mock-api';
import { StyleRoot } from 'radium';
import React, { cloneElement, PropTypes } from 'react';
import { locationShape } from 'react-router/lib/PropTypes';

import { ALPHA_NUMBERIC } from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.prevChildren = null;
  }

  getChildContext() {
    return { adapter: getMockAdapter() };
  }

  componentWillMount() {
    LayeredKeyBinding.bind('esc', () => this.props.toggleEditMode(this.props.location.pathname));
    ALPHA_NUMBERIC.forEach((letter) => {
      LayeredKeyBinding.bind(letter, () => {
        const pathname = this.props.location.pathname;
        if (['/', '/edit/'].includes(pathname)) {
          this.props.changeSearchQuery(letter);
          this.props.toggleSearchMode();
        }
      });
    });
  }

  componentDidMount() {
    const { receiveTokenFromCookie, fetchLandingPageContent } = this.props;

    receiveTokenFromCookie();
    fetchLandingPageContent();
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    ALPHA_NUMBERIC.map(LayeredKeyBinding.unbind);
  }

  children() {
    const { children, location } = this.props;
    this.prevChildren = cloneElement(children, { pathname: location.pathname });
    return this.prevChildren;
  }

  render() {
    const { location, appContent } = this.props;
    const children = this.children();

    return (
      <StyleRoot>
        <EditModeProvider location={ location }>
          <RouteTransition pathname={ appContent }>
            { children }
          </RouteTransition>
          <LoginModalContainer location={ location }/>
          <GenericModalContainer location={ location }/>
        </EditModeProvider>
      </StyleRoot>
    );
  }
}

App.childContextTypes = {
  adapter: PropTypes.func
};

App.propTypes = {
  children: PropTypes.node,
  fetchLandingPageContent: PropTypes.func,
  appContent: PropTypes.string,
  params: PropTypes.object,
  receiveTokenFromCookie: PropTypes.func,
  showLoginModal: PropTypes.bool,
  location: locationShape,
  toggleEditMode: PropTypes.func,
  toggleSearchMode: PropTypes.func,
  changeSearchQuery: PropTypes.func,
};

App.defaultProps = {
  params: {},
  fetchLandingPageContent: () => {},
  location: {
    pathname: ''
  },
  receiveTokenFromCookie: () => {
  },
  changeSearchQuery: () => {
  }
};
