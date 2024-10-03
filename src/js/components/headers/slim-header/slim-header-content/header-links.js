import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { QA_LINK, NPI_LINK } from 'utils/constants';
import styles from 'components/headers/slim-header/slim-header-content/header-links.sass';
// import PinboardButtonContainer from 'containers/headers/slim-header/pinboard-button-container';


export default function HeaderLinks({ position }) {
  return (
    <div className={ cx(styles.headerLinks, position) }>
      <a href={ NPI_LINK } target='_blank' rel='noopener noreferrer' className='header-link'>National Police Index</a>
      <a href={ config.v1Url } className='header-link'>Data Tool (1988-2018)</a>
      <a href={ QA_LINK } className='header-link'>Q&A</a>
      <Link to='/documents/' className='header-link'>Documents</Link>
      {/* <PinboardButtonContainer /> */}
    </div>
  );
}


HeaderLinks.propTypes = {
  position: PropTypes.string,
};

HeaderLinks.defaultProps = {
  position: 'top',
};
