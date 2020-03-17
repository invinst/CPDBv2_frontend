import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { QA_LINK } from 'utils/constants';
import styles from 'components/headers/slim-header/slim-header-content/right-links.sass';
import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';


export default function RightLinks({ position }) {
  return (
    <div className={ cx(styles.rightLinks, position) }>
      <a href={ config.v1Url } className='right-link'>Data</a>
      <a href={ QA_LINK } className='right-link'>Q&A</a>
      <Link to='/documents/' className='right-link'>Documents</Link>
      <PinboardButton />
    </div>
  );
}

RightLinks.propTypes = {
  position: PropTypes.string,
};

RightLinks.defaultProps = {
  position: 'top',
};
