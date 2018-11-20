import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import style from './link-item.sass';
import NavigationButton from './navigation-button';


export default class LinkItem extends Component {
  render() {
    const { title, value, navigationText, isLeft, hideBorder, to } = this.props;

    return (
      <Link
        className={ cx(`${style.linkItem} navigation-button-parent`, { left: isLeft, border: !hideBorder }) }
        to={ to }
      >
        <div className='link-item-title'>
          { title }
        </div>
        <div className='link-item-value'>
          { value }
          { navigationText && <NavigationButton text={ navigationText }/> }
        </div>
      </Link>
    );
  }
}

LinkItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLeft: PropTypes.bool,
  hideBorder: PropTypes.bool,
  to: PropTypes.string,
  navigationText: PropTypes.string,
};

LinkItem.defaultProps = {
  hideBorder: false,
};
