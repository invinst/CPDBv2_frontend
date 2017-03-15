import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import Mousetrap from 'mousetrap';
import React, { PropTypes } from 'react';

import { getMockAdapter } from 'mock-api';
import BottomSheetContainer from 'containers/bottom-sheet';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import Header from 'components/header';
import LoginModalContainer from 'containers/login-modal-container';
import SearchPage from 'components/search-page';
import RouteTransition from 'components/animation/route-transition';

import { ALPHA_NUMBERIC } from 'utils/constants';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.prevChildren = null;
  }

  getChildContext() {
    return { adapter: getMockAdapter() };
  }

  componentDidMount() {
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
    Mousetrap.bind('esc', () => this.props.toggleEditMode(this.props.location.pathname));
    ALPHA_NUMBERIC.map((letter) => (Mousetrap.bind(letter, this.props.toggleSearchMode)));
  }

  componentWillReceiveProps(nextProps) {
    const { reportId, faqId, officerId } = this.props.params;
    if (this.props.children && !(reportId || faqId || officerId)) {
      this.prevChildren = this.props.children;
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
    ALPHA_NUMBERIC.map(Mousetrap.unbind);
  }

  children() {
    const { children, params } = this.props;
    const { reportId, faqId, officerId } = params;
    if ((reportId || faqId || officerId) && this.prevChildren) {
      return this.prevChildren;
    }
    this.prevChildren = children;
    return children;
  }

  showHeader(children) {
    return (!children || [SearchPage].indexOf(children.type) === -1);
  }

  render() {
    const { location, appContent, params } = this.props;
    const { pathname } = location;
    const children = this.children();
    const showHeader = this.showHeader(children);

    return (
      <StyleRoot>
        <EditModeContainer location={ location }>
          <Header pathname={ pathname } appContent={ appContent } show={ showHeader }/>
          <RouteTransition pathname={ appContent }>
            { this.children() }
          </RouteTransition>
          <BottomSheetContainer params={ params } location={ location }/>
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
  appContent: PropTypes.string,
  params: PropTypes.object,
  receiveTokenFromCookie: PropTypes.func,
  showLoginModal: PropTypes.bool,
  location: locationShape,
  toggleEditMode: PropTypes.func,
  toggleSearchMode: PropTypes.func
};

App.defaultProps = {
  params: {},
  location: {},
  receiveTokenFromCookie: () => {}
};
