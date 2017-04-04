import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { faster } from 'utils/spring-presets';
import { windowAddEventListener, windowRemoveEventListener } from 'utils/dom';
import HeaderContent from 'components/header/header-content';
import { compactHeaderWrapperStyle } from 'components/header/compact-header.style';


function shouldShow() {
  return (window.scrollY > 145);
}

export default class CompactHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { show: shouldShow() };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    windowAddEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    windowRemoveEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.show !== shouldShow()) {
      this.setState({ show: shouldShow() });
    }
  }

  show() {
    return (this.state.show || this.props.show);
  }

  renderHeader(pathname, top) {
    return (
      <div style={ { top: `${top * -88}px`, ...compactHeaderWrapperStyle } }>
        <HeaderContent compact={ true } pathname={ pathname }/>
      </div>
    );
  }

  render() {
    const { pathname } = this.props;
    if (global.disableAnimation) {
      return this.renderHeader(pathname, this.show() ? 0 : 1);
    }
    return (
      <Motion defaultStyle={ this.show() ? { top: 0 }: { top: 1 } }
        style={ this.show() ? { top: spring(0, faster()) } : { top: spring(1, faster()) } }>
        { interpolatingStyle => this.renderHeader(pathname, interpolatingStyle.top) }
      </Motion>
    );
  }
}

CompactHeader.propTypes = {
  pathname: PropTypes.string,
  show: PropTypes.bool
};
