import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './pinboard-introduction.sass';
import { isPinboardIntroductionVisited, setPinboardIntroductionVisited } from 'utils/pinboard';
import browserHistory from 'utils/history';
import { PINBOARD_INTRODUCTION_DELAY } from 'utils/constants';


export default class PinboardIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIntroduction: false,
    };
  }

  componentDidMount() {
    if (this.shouldShowIntroduction()) {
      this.startDisplayTimeout();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.shouldShowIntroduction()) {
      const { searchPageHide } = this.props;
      if (prevProps.searchPageHide && !searchPageHide) {
        this.displayIntroductionTimeout && clearTimeout(this.displayIntroductionTimeout);
        this.startDisplayTimeout();
      } else if (!prevProps.searchPageHide && searchPageHide) {
        this.setState({ displayIntroduction: false });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.displayIntroductionTimeout);
  }

  startDisplayTimeout = () => {
    this.displayIntroductionTimeout = setTimeout(() => {
      this.setState({ displayIntroduction: true });
    }, PINBOARD_INTRODUCTION_DELAY);
  };

  shouldShowIntroduction = () => {
    const { pinboardFeatureUsed } = this.props;
    return !pinboardFeatureUsed && !isPinboardIntroductionVisited();
  };

  onCloseButtonClick = () => {
    setPinboardIntroductionVisited();
    this.forceUpdate();
  };

  onGetStartedButtonClick = () => {
    setPinboardIntroductionVisited();
    browserHistory.push('/pinboard/');
  };

  render() {

    const { displayIntroduction } = this.state;
    return this.shouldShowIntroduction() && (
      <div className={ cx(
        styles.pinboardIntroduction,
        'pinboard-feature',
        { 'display-introduction': displayIntroduction }
      ) }>
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

PinboardIntroduction.propTypes = {
  pinboardFeatureUsed: PropTypes.bool,
  searchPageHide: PropTypes.bool,
};

PinboardIntroduction.defaultProps = {
  pinboardFeatureUsed: false,
  searchPageHide: true,
};
