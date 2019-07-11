import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import React, { PropTypes, cloneElement } from 'react';
import ModalVideo from 'react-modal-video';

import { getMockAdapter } from 'mock-api';
import EditModeProvider from 'components/edit-mode-provider';
import LoginModalContainer from 'containers/login-modal-container';
import GenericModalContainer from 'containers/generic-modal-container';
import VideoModalContainer from 'containers/video-modal-container';
import RouteTransition from 'containers/animation/route-transition';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { ALPHA_NUMBERIC } from 'utils/constants';


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
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
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
          <VideoModalContainer />
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
  location: {
    pathname: ''
  },
  receiveTokenFromCookie: () => {
  },
  changeSearchQuery: () => {
  }
};
