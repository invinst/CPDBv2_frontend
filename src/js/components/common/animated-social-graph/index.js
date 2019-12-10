import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { isEmpty, noop } from 'lodash';
import cx from 'classnames';

import SocialGraph from './social-graph';
import styles from './animated-social-graph.sass';
import sliderStyles from 'components/common/slider.sass';
import withLoadingSpinner from 'components/common/with-loading-spinner';

const ANIMATE_SPEED = 150;


export default class AnimatedSocialGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    };

    this.startTimelineFromBeginning = this.startTimelineFromBeginning.bind(this);
    this.toggleTimeline = this.toggleTimeline.bind(this);
    this.stopTimeline = this.stopTimeline.bind(this);
    this.intervalTickTimeline = this.intervalTickTimeline.bind(this);
    this.handleDateSliderChange = this.handleDateSliderChange.bind(this);
  }

  componentWillUnmount() {
    this.stopTimeline();
  }

  startTimeline() {
    const { updateRefreshIntervalId } = this.props;
    updateRefreshIntervalId(setInterval(this.intervalTickTimeline, ANIMATE_SPEED));
  }

  stopTimeline() {
    const { refreshIntervalId, updateRefreshIntervalId } = this.props;
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      updateRefreshIntervalId(null);
    }
  }

  startTimelineFromBeginning() {
    const { updateTimelineIdx } = this.props;
    this.stopTimeline();
    updateTimelineIdx(0);
    this.startTimeline();
  }

  toggleTimeline() {
    const { timelineIdx, updateTimelineIdx, refreshIntervalId, listEvent } = this.props;
    if (refreshIntervalId) {
      this.stopTimeline();
    } else {
      if (timelineIdx === listEvent.length - 1) {
        updateTimelineIdx(0);
      }
      this.startTimeline();
    }
  }

  intervalTickTimeline() {
    const { timelineIdx, updateTimelineIdx, listEvent } = this.props;
    if (timelineIdx < listEvent.length - 1) {
      updateTimelineIdx(timelineIdx + 1);
    } else {
      this.stopTimeline();
    }
  }

  handleDateSliderChange(value) {
    const { updateTimelineIdx } = this.props;
    updateTimelineIdx(value);
  }

  graphControlPanel() {
    const { listEvent, timelineIdx, refreshIntervalId, customRightControlButton } = this.props;
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
                className={ cx('toggle-timeline-btn', (refreshIntervalId) ? 'pause-icon' : 'play-icon') }
                onClick={ this.toggleTimeline }
              />
              <span className='current-date-label'>{ currentDateString }</span>
              <div className='custom-right-control-buttons-container'>{ customRightControlButton }</div>
              <div className='clearfix'/>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    const {
      officers,
      coaccusedData,
      listEvent,
      timelineIdx,
      selectedOfficerId,
      updateSelectedOfficerId,
      selectedEdge,
      updateSelectedEdge,
      updateSortedOfficerIds,
      performResizeGraph,
      showGraphControlPanel,
    } = this.props;

    return (
      <div className={ styles.animatedSocialGraph }>
        {
          !isEmpty(officers) && <SocialGraph
            officers={ officers }
            coaccusedData={ coaccusedData }
            listEvent={ listEvent }
            timelineIdx={ timelineIdx }
            startTimelineFromBeginning={ this.startTimelineFromBeginning }
            stopTimeline={ this.stopTimeline }
            selectedOfficerId={ selectedOfficerId }
            updateSelectedOfficerId={ updateSelectedOfficerId }
            selectedEdge={ selectedEdge }
            updateSelectedEdge={ updateSelectedEdge }
            updateSortedOfficerIds={ updateSortedOfficerIds }
            performResizeGraph={ performResizeGraph }
          />
        }
        { showGraphControlPanel && this.graphControlPanel() }
      </div>
    );
  }
}

AnimatedSocialGraph.propTypes = {
  officers: PropTypes.array,
  coaccusedData: PropTypes.array,
  listEvent: PropTypes.array,
  selectedOfficerId: PropTypes.number,
  updateSelectedOfficerId: PropTypes.func,
  selectedEdge: PropTypes.object,
  updateSelectedEdge: PropTypes.func,
  timelineIdx: PropTypes.number,
  updateTimelineIdx: PropTypes.func,
  refreshIntervalId: PropTypes.number,
  updateRefreshIntervalId: PropTypes.func,
  updateSortedOfficerIds: PropTypes.func,
  customRightControlButton: PropTypes.node,
  performResizeGraph: PropTypes.bool,
  showGraphControlPanel: PropTypes.bool,
};

AnimatedSocialGraph.defaultProps = {
  updateTimelineIdx: noop,
  updateRefreshIntervalId: noop,
  updateSelectedEdge: noop,
  showGraphControlPanel: true,
};

export const AnimatedSocialGraphWithSpinner = withLoadingSpinner(AnimatedSocialGraph, styles.socialGraphLoading);
