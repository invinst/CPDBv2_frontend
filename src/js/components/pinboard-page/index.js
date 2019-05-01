import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import FooterContainer from 'containers/footer-container';


export default class PinboardPage extends Component {
  componentDidUpdate(prevProps) {
    const prevID = prevProps.pinboard.id;
    const currID = this.props.pinboard.id;

    if (prevID !== currID) {
      browserHistory.replace(`/pinboard/${currID}/`);
    }
  }

  render() {
    const {
      pinboard,
      changePinboardTab,
      currentTab,
      hasMapMarker,
    } = this.props;
    return (
      <div className={ styles.pinboardPage }>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'pinboard-page') }>
          <Link to='/search/'>Back to search page</Link>
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
        <FooterContainer className='footer'/>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
};

