import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantCoaccusalsContainer from 'containers/pinboard-page/relevant/relevant-coaccusals';
import RelevantDocumentsContainer from 'containers/pinboard-page/relevant/relevant-documents';
import RelevantComplaintsContainer from 'containers/pinboard-page/relevant/relevant-complaints';
import FooterContainer from 'containers/footer-container';


export default class PinboardPage extends Component {
  render() {
    const { pinboard, changePinboardTab, currentTab, hasMapMarker } = this.props;
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
        </div>
        <div className='relevant-title'>Relevant</div>
        <RelevantDocumentsContainer />
        <RelevantCoaccusalsContainer />
        <RelevantComplaintsContainer />
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
