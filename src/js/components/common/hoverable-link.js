import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';


class HoverableLink extends Component {
  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const { to, href, hovering, style, children } = this.props;
    const className = classnames(this.props.className, 'link--transition');

    if (href) {
      return (
        <a
          href={ href }
          style={ hovering ? style.hover : style.base }
          className={ className }
          onClick={ this.handleClick }
        >
          { children }
        </a>
      );
    }

    return (
      <Link
        to={ to }
        style={ hovering ? style.hover : style.base }
        className={ className }
        onClick={ this.handleClick }
      >
        { children }
      </Link>
    );
  }
}

HoverableLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  hovering: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Hoverable(HoverableLink);
