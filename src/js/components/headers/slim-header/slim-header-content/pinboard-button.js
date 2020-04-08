import React, { Component } from 'react';
import cx from 'classnames';

import browserHistory from 'utils/history';
import { isPinboardButtonIntroductionVisited, setPinboardButtonIntroductionVisited } from 'utils/pinboard';
import styles from './pinboard-button.sass';


export default class PinboardButton extends Component {
  onClick = (e) => {
    e && e.stopPropagation();
    setPinboardButtonIntroductionVisited();
    browserHistory.push('/pinboard/');
  };

  onDismissClick = () => {
    setPinboardButtonIntroductionVisited();
    this.forceUpdate();
  };

  render() {
    const showIntroduction = !isPinboardButtonIntroductionVisited();
    return (
      <div className={ cx(styles.pinboardButton, 'pinboard-feature' ) }>
        <div
          className={ cx('header-link', { 'show-introduction': showIntroduction } ) }
          onClick={ this.onClick }
        >
          Pinboards
        </div>
        {
          showIntroduction && <div className='pinboard-button-introduction'>
            <div className='pinboard-button-introduction-title'>Introducing Pinboards</div>
            <div className='pinboard-button-introduction-content'>
              Create and share collections of officers, complaint records,
              and tactical response reports using CPDP Pinboards
            </div>
            <div className='pinboard-button-introduction-btns'>
              <a className='try-it-btn' onClick={ this.onClick }>Try it</a>
              <a className='dismiss-btn' onClick={ this.onDismissClick }>Dismiss</a>
            </div>
          </div>
        }
      </div>
    );
  }
}
