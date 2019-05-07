import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import PinnedSection from './pinned-section';
import SearchBar from './search-bar';
import Header from './header';
import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
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
      itemsByTypes,
      removeItemInPinboardPage,
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
            <PinboardPaneSection
              changePinboardTab={ changePinboardTab }
              currentTab={ currentTab }
              hasMapMarker={ hasMapMarker }
            />
          </div>
          <PinnedSection
            itemsByTypes={ itemsByTypes }
            removeItemInPinboardPage={ removeItemInPinboardPage }/>
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
  itemsByTypes: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  shouldRedirect: PropTypes.bool,
  isInitiallyLoading: PropTypes.bool,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
};
