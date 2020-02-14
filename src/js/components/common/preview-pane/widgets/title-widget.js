import PropTypes from 'prop-types';
import React from 'react';
import Truncate from 'react-truncate';

import styles from './title-widget.sass';


export default function TitleWidget(props) {
  const { title, subtitle } = props;
  return (
    <div className={ styles.titleWidget }>
      <div className='title-widget-title'>{ title }</div>
      <Truncate className='title-widget-subtitle' lines={ 3 } trimWhitespace={ true }>{ subtitle }</Truncate>
    </div>
  );
}

TitleWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

