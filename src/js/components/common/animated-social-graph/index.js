import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import SocialGraph from './social-graph';
import styles from './animated-social-graph.sass';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';

const AMINATE_SPEED = 150;


export default class AnimatedSocialGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineIdx: 0,
      refreshIntervalId: null,
      fullscreen: false,
    };

    this.startTimelineFromBeginning = this.startTimelineFromBeginning.bind(this);
    this.toggleTimeline = this.toggleTimeline.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.stopTimeline = this.stopTimeline.bind(this);
    this.intervalTickTimeline = this.intervalTickTimeline.bind(this);
    this.handleDateSliderChange = this.handleDateSliderChange.bind(this);
  }

  componentWillUnmount() {
    this.stopTimeline();
  }

  startTimeline() {
    this.setState({ refreshIntervalId: setInterval(this.intervalTickTimeline, AMINATE_SPEED) });
  }

  stopTimeline() {
    const { refreshIntervalId } = this.state;
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      this.setState({ refreshIntervalId: null });
    }
  }

  startTimelineFromBeginning() {
    this.stopTimeline();
    this.setState({ timelineIdx: 0 });
    this.startTimeline();
  }

  toggleTimeline() {
    const { timelineIdx } = this.state;
    if (this.state.refreshIntervalId) {
      this.stopTimeline();
    } else {
      if (timelineIdx === this.props.listEvent.length - 1) {
        this.setState({ timelineIdx: 0 });
      }
      this.startTimeline();
    }
  }

  toggleFullscreen() {
    this.setState((state) => {
      if (this.props.hasIntercom) {
        showIntercomLauncher(state.fullscreen);
      }
      return { fullscreen: !state.fullscreen };
    });
  }

  intervalTickTimeline() {
    const { isVisible } = this.props;
    const { timelineIdx } = this.state;
    if (isVisible) {
      if (timelineIdx < this.props.listEvent.length - 1) {
        this.setState({ timelineIdx: timelineIdx + 1 });
      } else {
        this.stopTimeline();
      }
    }
  }

  handleDateSliderChange(value) {
    this.setState({ timelineIdx: value });
  }

  fullscreenButton() {
    const { expandedLink } = this.props;
    const { fullscreen } = this.state;

    if (expandedLink) {
      return (
        <a href={ expandedLink } className='fullscreen-btn expand-icon' />
      );
    } else {
      return (
        <button
          className={ cx('fullscreen-btn', fullscreen ? 'compress-icon' : 'expand-icon') }
          onClick={ this.toggleFullscreen }
        />
      );
    }
  }

  graphControlPanel() {
    const { listEvent, isVisible } = this.props;
    const { timelineIdx, refreshIntervalId } = this.state;
    if (listEvent) {
      const numOfEvents = listEvent.length;

      if (numOfEvents > 1) {
        const currentDateString = listEvent[timelineIdx];
        let startDateLabel = listEvent[0];
        let endDateLabel = listEvent[numOfEvents - 1];

        return (
          <div className='graph-control-panel'>
            <div className='date-labels'>
              <div className='start-date-label'>{ startDateLabel }</div>
              <div className='end-date-label'>{ endDateLabel }</div>
              <div className='clearfix' />
            </div>
            <Slider
              step={ 1 }
              min={ 0 }
              max={ numOfEvents - 1 }
              defaultValue={ 0 }
              value={ timelineIdx }
              onChange={ this.handleDateSliderChange }
              className={ cx(sliderStyles.slider, 'test--timeline-slider') }
            />
            <div className='graph-actions'>
              <button
                className={ cx('toggle-timeline-btn', (refreshIntervalId && isVisible) ? 'pause-icon' : 'play-icon') }
                onClick={ this.toggleTimeline }
              />
              <span className='current-date-label'>{ currentDateString }</span>
              { this.fullscreenButton() }
              <div className='clearfix'/>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    const { officers, coaccusedData, listEvent, updateOfficerId } = this.props;
    const { timelineIdx, refreshIntervalId, fullscreen } = this.state;

    return (
      <div className={ cx(styles.animatedSocialGraph, { fullscreen }) }>
        {
          !isEmpty(officers) && <SocialGraph
            officers={ officers }
            coaccusedData={ coaccusedData }
            listEvent={ listEvent }
            timelineIdx={ timelineIdx }
            startTimelineFromBeginning={ this.startTimelineFromBeginning }
            collideNodes={ !refreshIntervalId }
            stopTimeline={ this.stopTimeline }
            fullscreen={ fullscreen }
            updateOfficerId={ updateOfficerId }
          />
        }
        { this.graphControlPanel() }
      </div>
    );
  }
}

AnimatedSocialGraph.propTypes = {
  officers: PropTypes.array,
  coaccusedData: PropTypes.array,
  listEvent: PropTypes.array,
  hasIntercom: PropTypes.bool,
  updateOfficerId: PropTypes.func,
  expandedLink: PropTypes.string,
  isVisible: PropTypes.bool,
};

AnimatedSocialGraph.defaultProps = {
  isVisible: true,
};
