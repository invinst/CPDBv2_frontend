import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './breadcrumb.sass';

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className={ styles.breadcrumbs }>
      <NavLink to={ '/' } className='breadcrumbs-item'>cpdp</NavLink>
      {
        breadcrumbs.map(({ path, text, isCurrent }) => (
          <React.Fragment key={ path }>
            <li className='shareable-header-breadcrumb-separator'/>
            {
              isCurrent ?
                <span className='breadcrumbs-item'>{ text }</span> :
                <NavLink to={ path } className='breadcrumbs-item'>{ text }</NavLink>
            }
          </React.Fragment>
        ))
      }
    </div>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
    isCurrent: PropTypes.bool,
  })),
};

export default Breadcrumbs;
