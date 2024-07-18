import PropTypes from 'prop-types';
import React from 'react';
import currencyFormatter from 'currency-formatter';

import Popup from 'components/common/popup';
import styles from './tortureBrady.sass';


export default function TortureBrady(props) {
  const { popup, pathName } = props;

  return (
    <div className={ styles.tortureBrady }>
      <Popup
        { ...popup }
        url={ pathName }
        className='tortureBrady-popup'
      />
    </div>
  );
}

TortureBrady.propTypes = {
  popup: PropTypes.object,
  pathName: PropTypes.string,
};