import { StyleRoot } from 'radium';
import { locationShape } from 'react-router/lib/PropTypes';
import React, { PropTypes } from 'react';

import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import { getMockAdapter } from 'mock-api';
import BottomSheetContainer from 'containers/bottom-sheet';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
import Header from 'components/header';
import LoginModalContainer from 'containers/login-modal-container';
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
    ALPHA_NUMBERIC.map((letter) => (LayeredKeyBinding.bind(letter, this.props.toggleSearchMode)));
  }

  componentDidMount() {
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
  }

  componentWillReceiveProps() {
    if (this.props.children) {
      this.prevChildren = this.props.children;
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    ALPHA_NUMBERIC.map(LayeredKeyBinding.unbind);
  }

  children() {
    const { children, params } = this.props;
    if ((params.reportId || params.faqId) && this.prevChildren) {
      return this.prevChildren;
    }
    return children;
  }

  bottomSheetContent() {
    const { params } = this.props;
    const { reportId, faqId } = params;
    if (reportId) {
      return { id: reportId, type: REPORT_TYPE };
    }
    if (faqId) {
      return { id: faqId, type: FAQ_TYPE };
    }
    return null;
  }

  render() {
    const { location, appContent } = this.props;
    const { pathname } = location;

    return (
      <StyleRoot>
        <EditModeContainer location={ location }>
          <Header pathname={ pathname } appContent={ appContent }/>
          <RouteTransition pathname={ appContent }>
            { this.children() }
          </RouteTransition>
          <BottomSheetContainer content={ this.bottomSheetContent() }/>
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
