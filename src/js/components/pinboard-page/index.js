import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './pinboard-page.sass';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import RelevantCoaccusalsContainer from 'containers/pinboard-page/relevant/relevant-coaccusals';


export default class PinboardPage extends Component {
  render() {
    const { pinboard, graphData } = this.props;
    return (
      <div className={ cx(responsiveContainerStyles.responsiveContainer, styles.pinboardPage) }>
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
        <div>Relevant</div>
        <RelevantCoaccusalsContainer/>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  graphData: PropTypes.object,
};
