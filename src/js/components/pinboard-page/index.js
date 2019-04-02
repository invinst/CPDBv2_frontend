import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './pinboard-page.sass';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import RelevantCoaccusalsContainer from 'containers/pinboard-page/relevant/relevant-coaccusals';
import RelevantDocumentsContainer from 'containers/pinboard-page/relevant/relevant-documents';
import RelevantComplaintsContainer from 'containers/pinboard-page/relevant/relevant-complaints';


export default class PinboardPage extends Component {
  render() {
    const { pinboard, graphData } = this.props;
    return (
      <div className={ styles.pinboardPage }>
        <div className={ cx(responsiveContainerStyles.responsiveContainer) }>
          <Link to='/search/'>Back to search page</Link>
          <div className='pinboard-info'>
            <div className='pinboard-title'>{ pinboard.title }</div>
            <div className='pinboard-description'>{ pinboard.description }</div>
          </div>
          <div className='data-visualizations'>
            <div className='pinboard-social-graph'>
              <AnimatedSocialGraph
                officers={ graphData.officers }
                coaccusedData={ graphData.coaccusedData }
                listEvent={ graphData.listEvent }
                hasIntercom={ true }
              />
            </div>
          </div>
        </div>
        <div className='relevant-title'>Relevant</div>
        <RelevantDocumentsContainer />
        <RelevantCoaccusalsContainer />
        <RelevantComplaintsContainer />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  graphData: PropTypes.object,
};
