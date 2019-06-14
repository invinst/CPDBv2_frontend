import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import * as ScrollMagic from 'scrollmagic';
import { isUndefined, isEqual, isEmpty } from 'lodash';
import { throttle } from 'lodash';

import style from './timeline.sass';
import Item from './item';
import ReactDOM from 'react-dom';
import { imgUrl } from 'utils/static-assets';

const SCROLL_THROTTLE_THRESHOLD = 150;

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.externalUpdate = true;
    this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_THROTTLE_THRESHOLD);
  }

  componentDidMount() {
    this.addScrollEvents();
  }

  componentDidUpdate(prevProps) {
    const { timelineIdx, items, timelineIdxTriggerChange } = this.props;
    if (!isEqual(items, prevProps.items)) {
      this.addScrollEvents();
    }
    this.externalUpdate = timelineIdxTriggerChange !== prevProps.timelineIdxTriggerChange;
    if (this.externalUpdate && timelineIdx !== prevProps.timelineIdx) {
      this.scrollController.scrollTo(`#trigger-${ timelineIdx > 1 ? timelineIdx - 1 : 0 }`);
    }
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
        container: ReactDOM.findDOMNode(this.refs.scrollContainer)
      }
    );

    items.forEach((item) => {
      if (!isUndefined(item.timelineIdx)) {
        new ScrollMagic.Scene({
          triggerElement: `#trigger-${item.timelineIdx}`,
          offset: -65,
          triggerHook: 0,
          duration: 57
        }).on('enter', (event) => {
          this.handleScroll(item);
        }).addTo(this.scrollController);
      }
    });
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
    const { items, pathname, onTrackingAttachment, timelineIdx } = this.props;
    return (
      <div ref='scrollContainer' className={ cx(style.officerTimeline, 'test--officer-timeline') }>
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
};

Timeline.defaultProps = {
  items: [],
};
