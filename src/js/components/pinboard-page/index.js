import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import TrackVisibility from 'react-on-screen';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import SearchBar from './search-bar';
import Header from './header';
import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import FooterContainer from 'containers/footer-container';


export default class PinboardPage extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { shouldRedirect, pinboard } = this.props;
    if (shouldRedirect && pinboard.url !== '') {
      browserHistory.replace(pinboard.url);
    }
  }

  render() {
    const {
      pinboard,
      changePinboardTab,
      currentTab,
      hasMapMarker,
      isInitiallyLoading,
    } = this.props;

    if (isInitiallyLoading) {
      return null;
    }

    return (
      <div className={ styles.pinboardPage }>
        <div className='pinboard-header'>
          <Header />
          <SearchBar />
        </div>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'pinboard-page') }>
          <div className='pinboard-info'>
            <div className='pinboard-title'>{ pinboard.title }</div>
            <div className='pinboard-description'>{ pinboard.description }</div>
          </div>
          <div className='data-visualizations'>
            <TrackVisibility partialVisibility={ true }>
              <PinboardPaneSection
                changePinboardTab={ changePinboardTab }
                currentTab={ currentTab }
                hasMapMarker={ hasMapMarker }
              />
            </TrackVisibility>
          </div>
          <div className='pinned-section'>
            <PinnedOfficersContainer/>
            <PinnedCRsContainer/>
            <PinnedTRRsContainer/>
          </div>
        </div>
        <RelevantSectionContainer />
        <FooterContainer className='footer'/>
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
  isInitiallyLoading: PropTypes.bool,
};

