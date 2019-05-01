import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Autocomplete from 'react-autocomplete';
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
      searchInputText: '',
      refreshIntervalId: null,
      fullscreen: false,
    };

    this.startTimelineFromBeginning = this.startTimelineFromBeginning.bind(this);
    this.toggleTimeline = this.toggleTimeline.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.stopTimeline = this.stopTimeline.bind(this);
    this.intervalTickTimeline = this.intervalTickTimeline.bind(this);
    this.handleDateSliderChange = this.handleDateSliderChange.bind(this);
    this.handleHighlightNodeUidChange = this.handleHighlightNodeUidChange.bind(this);
    this.handleHighlightNodeUidSelect = this.handleHighlightNodeUidSelect.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
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
    const { timelineIdx } = this.state;
    if (timelineIdx < this.props.listEvent.length - 1) {
      this.setState({ timelineIdx: timelineIdx + 1 });
    } else {
      this.stopTimeline();
    }
  }

  handleDateSliderChange(value) {
    this.setState({ timelineIdx: value });
  }

  handleHighlightNodeUidChange(event) {
    this.setState({ searchInputText: event.target.value });
  }

  handleHighlightNodeUidSelect(value) {
    this.setState({ searchInputText: value });
  }

  handleSearchClick() {
    this.setState((state) => {
      return { clickSearchState: !state.clickSearchState };
    });
  }

  formatDate(dateIndex) {
    const { listEvent } = this.props;
    const dateString = listEvent[dateIndex];
    if (dateString)
      return moment(dateString, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }

  graphControlPanel() {
    const { listEvent } = this.props;
    const { timelineIdx, refreshIntervalId, fullscreen } = this.state;
    if (listEvent) {
      const numOfEvents = listEvent.length;

      if (numOfEvents > 1) {
        const currentDateString = this.formatDate(timelineIdx);
        let startDateLabel = this.formatDate(0);
        let endDateLabel = this.formatDate(numOfEvents - 1);

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
                className={ cx('toggle-timeline-btn', refreshIntervalId ? 'pause-icon' : 'play-icon') }
                onClick={ this.toggleTimeline }
              />
              <span className='current-date-label'>{ currentDateString }</span>
              <button
                className={ cx('fullscreen-btn', fullscreen ? 'compress-icon' : 'expand-icon') }
                onClick={ this.toggleFullscreen }
              />
              { this.searchForm() }
              <div className='clearfix'/>
            </div>
          </div>
        );
      }
    }
  }

  searchForm() {
    const { officers } = this.props;
    const { searchInputText } = this.state;
    const customMenuStyle = {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'absolute',
      left: '0',
      top: 'auto',
      zIndex: 999,
      bottom: '26px',
      maxHeight: '300px',
      overflow: 'auto',
    };

    if (officers) {
      return (
        <div className='graph-search-form'>
          <div className='graph-search-input-container'>
            <Autocomplete
              shouldItemRender={ (item, value) => item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1 }
              getItemValue={ (item) => item.fullName }
              items={ officers }
              renderItem={ (item, isHighlighted) =>
                <div style={ { background: isHighlighted ? 'lightgray' : 'white' } }>
                  { item.fullName }
                </div>
              }
              menuStyle={ customMenuStyle }
              inputProps={ { placeholder: 'Search', className: 'graph-search-input' } }
              value={ searchInputText }
              onChange={ this.handleHighlightNodeUidChange }
              onSelect={ this.handleHighlightNodeUidSelect }
            />
          </div>
          <button className='graph-search-btn' onClick={ this.handleSearchClick }/>
        </div>
      );
    }
  }

  render() {
    const { officers, coaccusedData, listEvent, updateOfficerId } = this.props;
    const { timelineIdx, searchInputText, refreshIntervalId, clickSearchState, fullscreen } = this.state;

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
            searchText={ searchInputText }
            clickSearchState={ clickSearchState }
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
};
