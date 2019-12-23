import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as ScrollMagic from 'scrollmagic';
import { isUndefined, isEqual, isEmpty } from 'lodash';
import { throttle } from 'lodash';

import styles from './timeline.sass';
import Item from './item';
import ReactDOM from 'react-dom';
import { imgUrl } from 'utils/static-assets';
import withLoadingSpinner from 'components/common/with-loading-spinner';

const SCROLL_THROTTLE_THRESHOLD = 150;

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.externalUpdate = true;
    this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_THROTTLE_THRESHOLD);
  }

  componentDidMount() {
    const { timelineIdx } = this.props;
    this.addScrollEvents();
    if (!isUndefined(timelineIdx) && timelineIdx !== 0) {
      this.performScrollToTimelineIdx(timelineIdx);
    }
  }

  componentDidUpdate(prevProps) {
    const { timelineIdx, items, timelineIdxTriggerChange } = this.props;
    this.externalUpdate = timelineIdxTriggerChange !== prevProps.timelineIdxTriggerChange;
    const scrollToTimelineIdx = this.externalUpdate && timelineIdx !== prevProps.timelineIdx ? timelineIdx : undefined;
    if (!isEqual(items, prevProps.items)) {
      this.addScrollEvents();
    }
    this.performScrollToTimelineIdx(scrollToTimelineIdx);
  }

  componentWillUnmount() {
    this.destroyScrollEvents();
  }

  addScrollEvents() {
    const { items } = this.props;

    if (isEmpty(items)) {
      return;
    }

    this.destroyScrollEvents();

    this.scrollController = new ScrollMagic.Controller(
      {
        container: ReactDOM.findDOMNode(this.refs.scrollContainer),
      }
    );

    items.forEach((item) => {
      if (!isUndefined(item.timelineIdx)) {
        new ScrollMagic.Scene({
          triggerElement: `#trigger-${item.timelineIdx}`,
          offset: -50,
          triggerHook: 0,
          duration: 57,
        }).on('enter', (event) => {
          this.handleScroll(item);
        }).addTo(this.scrollController);
      }
    });
  }

  performScrollToTimelineIdx(scrollToTimelineIdx) {
    if (!isUndefined(scrollToTimelineIdx) && this.scrollController) {
      this.scrollController.scrollTo(`#trigger-${scrollToTimelineIdx}`);
    }
  }

  destroyScrollEvents() {
    if (this.scrollController) {
      this.scrollController.destroy(true);
      this.scrollController = null;
    }
  }

  handleScroll(item) {
    const { timelineIdx, updateTimelineIdx, refreshIntervalId } = this.props;
    if (timelineIdx !== item.timelineIdx) {
      if (!this.externalUpdate && !refreshIntervalId) {
        updateTimelineIdx(item.timelineIdx);
      }
    }
    if (timelineIdx === item.timelineIdx) {
      this.externalUpdate = false;
    }
  }

  render() {
    const { items, pathname, onTrackingAttachment, timelineIdx, updateSelectedCrid } = this.props;
    return (
      <div ref='scrollContainer' className={ styles.timeline }>
        { isEmpty(items) && (<img className='loading-img' src={ imgUrl('loading.svg') } />) }
        {
          items.map((item) => {
            return (
              <Item
                item={ item }
                key={ item.key }
                pathname={ pathname }
                onTrackingAttachment={ onTrackingAttachment }
                timelineIdx={ timelineIdx }
                updateSelectedCrid={ updateSelectedCrid }
              />
            );
          })
        }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  updateTimelineIdx: PropTypes.func,
  timelineIdx: PropTypes.number,
  timelineIdxTriggerChange: PropTypes.number,
  refreshIntervalId: PropTypes.number,
  updateSelectedCrid: PropTypes.func,
};

Timeline.defaultProps = {
  items: [],
};

export const TimelineWithSpinner = withLoadingSpinner(Timeline, styles.timelineLoading);
