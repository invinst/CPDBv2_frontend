import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './breadcrumb.sass';

const Breadcrumb = ({ breadcrumbItems }) => {
  return (
    <div className={ styles.breadcrumb }>
      <Link to={ '/' } className='breadcrumb-item'>cpdp</Link>
      {
        breadcrumbItems.map(({ path, text, isCurrent }) => (
          <React.Fragment key={ path }>
            <li className='shareable-header-breadcrumb-separator'/>
            {
              isCurrent ?
                <span className='breadcrumb-item'>{ text }</span> :
                <Link to={ path } className='breadcrumb-item'>{ text }</Link>
            }
          </React.Fragment>
        ))
      }
    </div>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
    isCurrent: PropTypes.bool,
  })),
};

export default Breadcrumb;
