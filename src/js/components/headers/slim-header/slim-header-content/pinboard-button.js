import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import browserHistory from 'utils/history';
import { isPinboardButtonIntroductionVisited, setPinboardButtonIntroductionVisited } from 'utils/pinboard';
import styles from './pinboard-button.sass';
import appConfig from 'utils/app-config';
import { DEFAULT_PINBOARD_PATH, APP_CONFIG_KEYS } from 'utils/constants';


export default class PinboardButton extends Component {
  state = { displayIntroduction: false };

  componentDidMount() {
    this.props.heatMapDataRequested && this.setdisplayIntroductionTimeout();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.heatMapDataRequested && this.props.heatMapDataRequested) {
      this.setdisplayIntroductionTimeout();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.displayIntroductionTimeout);
  }

  onClick = (e) => {
    e && e.stopPropagation();
    setPinboardButtonIntroductionVisited();
    browserHistory.push(DEFAULT_PINBOARD_PATH);
  };

  onDismissClick = () => {
    setPinboardButtonIntroductionVisited();
    this.forceUpdate();
  };

  setdisplayIntroductionTimeout() {
    this.displayIntroductionTimeout = setTimeout(() => {
      this.setState({ displayIntroduction: true });
    }, appConfig.get(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY));
  }

  render() {
    const { displayIntroduction } = this.state;
    const showIntroduction = !isPinboardButtonIntroductionVisited() && displayIntroduction;
    return (
      <div className={ cx(styles.pinboardButton, 'pinboard-feature' ) }>
        <div
          className={ cx('header-link', { 'show-introduction': showIntroduction } ) }
          onClick={ this.onClick }
        >
          Pinboards
        </div>
        {
          showIntroduction &&
            <div className='pinboard-button-introduction'>
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

PinboardButton.propTypes = {
  heatMapDataRequested: PropTypes.bool,
};

PinboardButton.defaultProps = {
  heatMapDataRequested: false,
};
