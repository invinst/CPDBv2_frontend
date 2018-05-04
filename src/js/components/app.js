import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import React, { PropTypes, cloneElement } from 'react';

import { getMockAdapter } from 'mock-api';
import BottomSheetContainer from 'containers/bottom-sheet';
import EditModeProvider from 'components/edit-mode-provider';
import LoginModalContainer from 'containers/login-modal-container';
import GenericModalContainer from 'containers/generic-modal-container';
import RouteTransition from 'components/animation/route-transition';
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
    const { receiveTokenFromCookie, fetchLandingPageContent } = this.props;

    receiveTokenFromCookie();
    fetchLandingPageContent();
  }

  componentWillReceiveProps(nextProps) {
    const { reportId, faqId, officerId } = this.props.params;
    if (this.props.children && !(reportId || faqId || officerId)) {
      this.prevChildren = this.props.children;
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    ALPHA_NUMBERIC.map(LayeredKeyBinding.unbind);
  }

  children() {
    const { children, params, location } = this.props;
    const { reportId, faqId } = params;
    if ((reportId || faqId) && this.prevChildren) {
      return this.prevChildren;
    }
    this.prevChildren = cloneElement(children, { pathname: location.pathname });
    return this.prevChildren;
  }

  render() {
    const { location, appContent, params } = this.props;
    const children = this.children();

    return (
      <StyleRoot>
        <EditModeProvider location={ location }>
          <RouteTransition pathname={ appContent }>
            { children }
          </RouteTransition>
          <BottomSheetContainer params={ params } location={ location }/>
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
