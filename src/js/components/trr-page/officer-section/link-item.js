import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './link-item.sass';
import NavigationButton from './navigation-button';


export default function LinkItem(props) {
  const { title, value, navigationText, to } = props;

  return (
    <Link
      className={ `${style.linkItem} navigation-button-container` }
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

LinkItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.string,
  navigationText: PropTypes.string,
};
