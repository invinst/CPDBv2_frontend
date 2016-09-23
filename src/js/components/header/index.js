import { includes, isEqual } from 'lodash';
import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { assign } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import HeaderContent from 'components/header/header-content';
import { COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import { spacerStyle, wrapperCompactStyle } from './header.style';
import { faster } from 'utils/spring-presets';


const COMPACT_STYLE_PATHNAMES = [COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH];

function shouldShowCompact() {
  return (window.scrollY > 145);
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showCompact: shouldShowCompact() };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  showCompact() {
    return this.state.showCompact || includes(COMPACT_STYLE_PATHNAMES, this.props.pathname);
  }

  handleScroll() {
    if (this.state.showCompact !== shouldShowCompact()) {
      this.setState({ showCompact: shouldShowCompact() });
    }
  }

  renderHeader(compact=false, style={}) {
    const { pathname } = this.props;
    let wrapperStyle = compact ? wrapperCompactStyle : null;
    wrapperStyle = assign({}, wrapperStyle, style);

    if (!compact && pathname !== '/') {
      return (
        <div style={ spacerStyle }/>
      );
    }

    return (
      <div style={ wrapperStyle }>
        <HeaderContent compact={ compact } pathname={ pathname }/>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Motion defaultStyle={ this.showCompact() ? { top: 0 }: { top: 1 } }
          style={ this.showCompact() ? { top: spring(0, faster()) }: { top: spring(1, faster()) } }>
        { interpolatingStyle => (
          <div>
            { this.renderHeader(false) }
            { this.renderHeader(true, { top: `${interpolatingStyle.top * -88}px` }) }
          </div>
        ) }
        </Motion>
      </div>
    );
  }
}

Header.propTypes = {
  pathname: PropTypes.string
};

export default ConfiguredRadium(Header);
