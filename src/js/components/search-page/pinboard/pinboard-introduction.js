import React, { Component } from 'react';
import cx from 'classnames';

import styles from './pinboard-introduction.sass';
import { isPinboardIntroductionVisited, setPinboardIntroductionVisited } from 'utils/pinboard';
import browserHistory from 'utils/history';

export default class PinboardIntroduction extends Component {
  onCloseButtonClick = () => {
    setPinboardIntroductionVisited();
    this.forceUpdate();
  };

  onGetStartedButtonClick = () => {
    setPinboardIntroductionVisited();
    browserHistory.push('/pinboard/');
  };

  render() {
    return !isPinboardIntroductionVisited() && (
      <div className={ cx(styles.pinboardIntroduction, 'pinboard-feature') }>
        <div className='introduction-title'>Introducing Pinboards</div>
        <div className='introduction-close-btn' onClick={ this.onCloseButtonClick } />
        <div className='pinboard-thumbnail' />
        <div className='introduction-content'>
          <div className='introduction-text'>
            Use search to create collections of officers, complaint records, and tactical reponse reports.
          </div>
          <a className='get-started-btn' onClick={ this.onGetStartedButtonClick }>Get started</a>
        </div>
        <div className='clearfix' />
      </div>
    );
  }
}
