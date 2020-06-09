import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import browserHistory from 'utils/history';
import styles from './pinboard-button.sass';
import appConfig from 'utils/app-config';
import { DEFAULT_PINBOARD_PATH, APP_CONFIG_KEYS } from 'utils/constants';


export default class PinboardButton extends Component {
  state = { displayIntroduction: false };

  componentDidMount() {
    this.props.heatMapDataRequested && this.setDisplayIntroductionTimeout();
  }

  componentDidUpdate(prevProps, prevState) {
    const { heatMapDataRequested, isPinboardButtonIntroductionVisited } = this.props;
    if (
      !prevProps.heatMapDataRequested
      && heatMapDataRequested
      && !isPinboardButtonIntroductionVisited
      && !this.displayIntroductionTimeout
    ) {
      this.setDisplayIntroductionTimeout();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.displayIntroductionTimeout);
  }

  onClick = (e) => {
    e && e.stopPropagation();
    this.props.visitPinboardButtonIntroduction();
    browserHistory.push(DEFAULT_PINBOARD_PATH);
  };

  setDisplayIntroductionTimeout() {
    this.displayIntroductionTimeout = setTimeout(() => {
      this.setState({ displayIntroduction: true });
      this.displayIntroductionTimeout = null;
    }, appConfig.get(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY));
  }

  render() {
    const { displayIntroduction } = this.state;
    const { isPinboardButtonIntroductionVisited, visitPinboardButtonIntroduction } = this.props;
    const showIntroduction = !isPinboardButtonIntroductionVisited && displayIntroduction;
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
              <div className='pinboard-button-introduction-close-btn' onClick={ visitPinboardButtonIntroduction } />
              <div className='pinboard-button-introduction-content'>
                Create and share collections of officers, complaint records,
                and tactical response reports using CPDP Pinboards
              </div>
              <div className='pinboard-button-introduction-btns'>
                <a className='try-it-btn' onClick={ this.onClick }>Try it</a>
              </div>
            </div>
        }
      </div>
    );
  }
}

PinboardButton.propTypes = {
  heatMapDataRequested: PropTypes.bool,
  isPinboardButtonIntroductionVisited: PropTypes.bool,
  visitPinboardButtonIntroduction: PropTypes.func,
};

PinboardButton.defaultProps = {
  heatMapDataRequested: false,
};
