import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { faster } from 'utils/spring-presets';
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
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.show !== shouldShow()) {
      this.setState({ show: shouldShow() });
    }
  }

  show() {
    return (this.state.show || this.props.show);
  }

  render() {
    const { pathname } = this.props;
    return (
      <Motion defaultStyle={ this.show() ? { top: 0 }: { top: 1 } }
        style={ this.show() ? { top: spring(0, faster()) } : { top: spring(1, faster()) } }>
      { interpolatingStyle => (
        <div style={ { top: `${interpolatingStyle.top * -88}px`, ...compactHeaderWrapperStyle } }>
          <HeaderContent compact={ true } pathname={ pathname }/>
        </div>
      ) }
      </Motion>
    );
  }
}

CompactHeader.propTypes = {
  pathname: PropTypes.string,
  show: PropTypes.bool
};
