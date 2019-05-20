import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';

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
import EmptyPinboard from './empty-pinboard';


export default class PinboardPage extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { shouldRedirect, pinboard } = this.props;
    if (shouldRedirect && pinboard.url !== '') {
      browserHistory.replace(pinboard.url);
    }
  }

  renderContent() {
    const {
      pinboard,
      changePinboardTab,
      currentTab,
      hasMapMarker,
      isEmptyPinboard,
    } = this.props;

    if (isEmptyPinboard) {
      return EmptyPinboard;
    }

    return (
      <div>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'pinboard-page') }>
          <div className='pinboard-info'>
            <div className='pinboard-title'>{ pinboard.title }</div>
            <div className='pinboard-description'>{ pinboard.description }</div>
          </div>
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
    const { isInitiallyLoading, isEmptyPinboard } = this.props;

    if (isInitiallyLoading) {
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
  isInitiallyLoading: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
};

