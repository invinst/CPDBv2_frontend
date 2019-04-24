import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import PinnedSection from './pinned-section';
import cx from 'classnames';
import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
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
      itemsByTypes,
      removeItemInPinboardPage,
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
  itemsByTypes: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
};
