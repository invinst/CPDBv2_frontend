import { includes } from 'lodash';
import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import React, { PropTypes } from 'react';

import { getMockAdapter } from 'mock-api';
import BottomSheetContainer from 'containers/bottom-sheet';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import SlimHeader from 'components/headers/slim-header';
import LoginModalContainer from 'containers/login-modal-container';
import GenericModalContainer from 'containers/generic-modal-container';
import SearchPageContainer from 'containers/search-page-container';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
import RouteTransition from 'components/animation/route-transition';
import * as LayeredKeyBinding from 'utils/layered-key-binding';

import { ALPHA_NUMBERIC } from 'utils/constants';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';

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
    const { children, params } = this.props;
    const { reportId, faqId } = params;
    if ((reportId || faqId) && this.prevChildren) {
      return this.prevChildren;
    }
    this.prevChildren = children;
    return children;
  }

  renderHeader(children) {
    const headerlessPages = [SearchPageContainer, InlineAliasAdminContainer];
    if (!children || includes(headerlessPages, children.type)) {
      return null;
    }

    const shareablePages = [OfficerPageContainer, CRPageContainer, UnitProfilePageContainer];
    if (includes(shareablePages, children.type)) {
      return <ShareableHeaderContainer/>;
    }

    const { location } = this.props;
    return (
      <SlimHeader pathname={ location.pathname } />
    );
  }

  render() {
    const { location, appContent, params } = this.props;
    const children = this.children();

    return (
      <StyleRoot>
        <EditModeContainer location={ location }>
          { this.renderHeader(children) }
          <RouteTransition pathname={ appContent }>
            { children }
          </RouteTransition>
          <BottomSheetContainer params={ params } location={ location }/>
          <LoginModalContainer location={ location }/>
          <GenericModalContainer location={ location }/>
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
