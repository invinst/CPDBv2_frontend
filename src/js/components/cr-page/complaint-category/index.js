import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './complaint-category.sass';


export default function ComplaintCategory(props) {
  const { category, subcategory } = props;
  return (
    <div className={ cx(styles.complaintCategory, 'test--cr-category-wrapper') }>
      <div className='cr-category'>{ category }</div>
      <div className='cr-subcategory'>{ subcategory }</div>
    </div>
  );
}

ComplaintCategory.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string,
};
