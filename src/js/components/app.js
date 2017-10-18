import { includes } from 'lodash';
import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import React, { PropTypes } from 'react';

import { getMockAdapter } from 'mock-api';
import BottomSheetContainer from 'containers/bottom-sheet';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import SlimHeader from 'components/slim-header';
import LoginModalContainer from 'containers/login-modal-container';
import GenericModalContainer from 'containers/generic-modal-container';
import SearchPageContainer from 'containers/search-page-container';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
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
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
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
    const { children, params } = this.props;
    const { reportId, faqId } = params;
    if ((reportId || faqId) && this.prevChildren) {
      return this.prevChildren;
    }
    this.prevChildren = children;
    return children;
  }

  showHeader(children) {
    const headerlessPages = [SearchPageContainer, InlineAliasAdminContainer];
    return (
      !children ||
      !includes(headerlessPages, children.type)
    );
  }

  render() {
    const { location, appContent, params, openLegalDisclaimerModal } = this.props;
    const children = this.children();
    const showHeader = this.showHeader(children);

    return (
      <StyleRoot>
        <EditModeContainer location={ location }>
          <SlimHeader
            show={ showHeader }
            pathname={ location.pathname }
            openLegalDisclaimerModal={ openLegalDisclaimerModal }
          />
          <RouteTransition pathname={ appContent }>
            { children }
          </RouteTransition>
          <BottomSheetContainer params={ params } location={ location }/>
          <LoginModalContainer location={ location }/>
          <GenericModalContainer location={ location } />
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
  toggleSearchMode: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  openLegalDisclaimerModal: PropTypes.func
};

App.defaultProps = {
  params: {},
  location: {
    pathname: ''
  },
  receiveTokenFromCookie: () => {},
  changeSearchQuery: () => {}
};
