import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import Scroller from 'components/common/scroller';

const SCROLL_PROPERTY = {
  left: 'scrollLeft',
  top: 'scrollTop'
};


export default class SmoothScroller extends Component {
  constructor(props) {
    super(props);
    this.handleScrollerElementRef = this.handleScrollerElementRef.bind(this);
    this.prevScrollOffset = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.prevSelectedOffset = this.props.selectedOffset;
  }

  getScrollOffset() {
    if (!this.scrollerEl) {
      return 0;
    }
    const { selectedOffset, direction, directionMargin } = this.props;
    if (selectedOffset !== this.prevSelectedOffset) {
      const offset = this.scrollerEl.getBoundingClientRect()[direction];
      this.prevScrollOffset = selectedOffset - offset - directionMargin;
    }
    return this.prevScrollOffset;
  }

  handleScrollerElementRef(el) {
    this.scrollerEl = el;
  }

  render() {
    const { style, children, direction } = this.props;
    const scrollOffset = this.getScrollOffset();
    return (
      <Motion
        style={ { scrollOffset: spring(scrollOffset, defaultConfig()) } }
        defaultStyle={ { scrollOffset: scrollOffset } }>
        {
          ({ scrollOffset }) => {
            const scrollerProps = {
              style,
              [SCROLL_PROPERTY[direction]]: scrollOffset,
              onElementRef: this.handleScrollerElementRef
            };

            return (
              <Scroller { ...scrollerProps }>
                { children }
              </Scroller>
            );
          }
        }
      </Motion>
    );
  }
}

SmoothScroller.defaultProps = {
  directionMargin: 0,
  direction: 'top'
};

SmoothScroller.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  selectedOffset: PropTypes.number,
  direction: PropTypes.string,
  directionMargin: PropTypes.number
};
