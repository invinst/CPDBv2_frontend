import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import style from './half-pane.sass';

export default class HalfPane extends Component {
  render() {
    const { className, rightHalf, officerId } = this.props;
    return (
      <Link
        to={ `/officer/${officerId}/` }
        className={ cx(`${style.halfPane} ${className}`, { 'right-half': rightHalf }) }
      />
    );
  }
}

HalfPane.propTypes = {
  rightHalf: PropTypes.bool,
  officerId: PropTypes.number,
  className: PropTypes.string,
};

HalfPane.defaultProps = {
  rightHalf: false
};
