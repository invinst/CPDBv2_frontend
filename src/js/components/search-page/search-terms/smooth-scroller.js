import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import Scroller from 'components/common/scroller';


export default class SmoothScroller extends Component {
  constructor(props) {
    super(props);
    this.handleScrollerElementRef = this.handleScrollerElementRef.bind(this);
    this.prevScrollLeft = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.prevSelectedItemLeft = this.props.selectedItemLeft;
  }

  getScrollLeft() {
    if (!this.scrollerEl) {
      return 0;
    }
    const { selectedItemLeft } = this.props;
    if (selectedItemLeft !== this.prevSelectedItemLeft) {
      const { left } = this.scrollerEl.getBoundingClientRect();
      const scrollLeft = this.scrollerEl.scrollLeft;
      const itemMarginLeft = 0;
      this.prevScrollLeft = selectedItemLeft - left + scrollLeft - itemMarginLeft;
    }
    return this.prevScrollLeft;
  }

  handleScrollerElementRef(el) {
    this.scrollerEl = el;
  }

  render() {
    const { style, children } = this.props;
    const _scrollLeft = this.getScrollLeft();
    return (
      <Motion
        style={ { scrollLeft: spring(_scrollLeft, defaultConfig()) } }
        defaultStyle={ { scrollLeft: _scrollLeft } }>
        { ({ scrollLeft }) => (
          <Scroller style={ style } scrollLeft={ scrollLeft }
            onElementRef={ this.handleScrollerElementRef }>
            { children }
          </Scroller>
      ) }
      </Motion>
    );
  }
}

SmoothScroller.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  selectedItemLeft: PropTypes.number
};
