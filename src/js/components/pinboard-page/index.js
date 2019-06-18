import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import { noop } from 'lodash';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import SearchBar from './search-bar';
import Header from './header';
import styles from './pinboard-page.sass';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import FooterContainer from 'containers/footer-container';
import EmptyPinboard from './empty-pinboard';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { location, params, routes, pushBreadcrumbs } = this.props;
    pushBreadcrumbs({ location, params, routes });
  }

  componentDidUpdate(prevProps) {
    const { pinboard } = prevProps;
    const { pinboard: currentPinboard, shouldRedirect, updatePathName } = this.props;

    if (currentPinboard.url !== '') {
      if (shouldRedirect && pinboard.id !== currentPinboard.id) {
        browserHistory.replace(currentPinboard.url);
      } else if (currentPinboard.url !== pinboard.url) {
        updatePathName(currentPinboard.url);
      }
    }
  }

  renderContent() {
    const {
      changePinboardTab,
      currentTab,
      hasMapMarker,
      isEmptyPinboard,
      examplePinboards,
    } = this.props;

    if (isEmptyPinboard) {
      return <EmptyPinboard examplePinboards={ examplePinboards } />;
    }

    return (
      <div>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'pinboard-page') }>
          <PinboardInfoContainer />
          <div className='data-visualizations'>
            <PinboardPaneSection
              changePinboardTab={ changePinboardTab }
              currentTab={ currentTab }
              hasMapMarker={ hasMapMarker }
            />
          </div>
          <div className='pinned-section'>
            <PinnedOfficersContainer/>
            <PinnedCRsContainer/>
            <PinnedTRRsContainer/>
          </div>
        </div>
        <RelevantSectionContainer />
      </div>
    );
  }

  render() {
    const { initialRequested, isEmptyPinboard } = this.props;

    if (!initialRequested) {
      return null;
    }

    return (
      <div className={ cx(styles.pinboardPage, { 'empty': isEmptyPinboard } ) }>
        <div className='pinboard-header'>
          <Header />
          <SearchBar shareable={ !isEmptyPinboard }/>
        </div>
        { this.renderContent() }
        <FooterContainer className='footer' />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  params: PropTypes.object,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  shouldRedirect: PropTypes.bool,
  initialRequested: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  updatePathName: PropTypes.func,
  examplePinboards: PropTypes.array,
};

PinboardPage.defaultProps = {
  pushBreadcrumbs: noop,
};
