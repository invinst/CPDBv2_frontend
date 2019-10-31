import React, { Component, PropTypes } from 'react';
import Truncate from 'react-truncate';

import styles from './title-widget.sass';


export default class HeaderWidget extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className={ styles.titleWidget }>
        <div className='header-widget-title'>{ title }</div>
        <Truncate className='header-widget-subtitle' lines={ 3 } trimWhitespace={ true }>{ subtitle }</Truncate>
      </div>
    );
  }
}

HeaderWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

