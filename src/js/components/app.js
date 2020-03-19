import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cx from 'classnames';
import { HelmetProvider } from 'react-helmet-async';

import config from 'config';
import EditModeProviderContainer from 'containers/edit-mode-provider-container';
import LoginModalContainer from 'containers/login-modal-container';
import GenericModalContainer from 'containers/generic-modal-container';
import VideoModalContainer from 'containers/video-modal-container';
import RouteTransition from 'containers/animation/route-transition';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { ALPHA_NUMBERIC } from 'utils/constants';
import { getPageRoot } from 'utils/url';
import styles from './app.sass';
import RouterRoot from './router-root';


toast.configure();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.bindEvents();
  }

  componentDidMount() {
    const { receiveTokenFromCookie } = this.props;

    receiveTokenFromCookie();
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    ALPHA_NUMBERIC.map(LayeredKeyBinding.unbind);
  }

  bindEvents() {
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

  render() {
    const { location } = this.props;
    const { pinboard: enablePinboardFeature } = config.enableFeatures;

    return (
      <HelmetProvider>
        <StyleRoot className={ cx(styles.app, { 'pinboard-disabled': !enablePinboardFeature }) }>
          <EditModeProviderContainer>
            <RouteTransition pathname={ location.pathname }>
              <RouterRoot location={ location }/>
            </RouteTransition>
            <LoginModalContainer location={ location }/>
            <GenericModalContainer location={ location }/>
            <VideoModalContainer />
          </EditModeProviderContainer>
          <ToastContainer
            pauseOnFocusLoss={ false }
            closeButton={ false }
            hideProgressBar={ true }
            autoClose={ 3000 }
            className={ getPageRoot(location.pathname) }
          />
        </StyleRoot>
      </HelmetProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object,
  receiveTokenFromCookie: PropTypes.func,
  showLoginModal: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  toggleEditMode: PropTypes.func,
  toggleSearchMode: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  editModeOn: PropTypes.bool,
};

App.defaultProps = {
  params: {},
  location: {
    pathname: '',
  },
  receiveTokenFromCookie: () => {},
  changeSearchQuery: () => {},
};
