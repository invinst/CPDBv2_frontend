import React, { Component, PropTypes } from 'react';
import Truncate from 'react-truncate';

import styles from './title-widget.sass';


export default class TitleWidget extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className={ styles.titleWidget }>
        <div className='title-widget-title'>{ title }</div>
        <Truncate className='title-widget-subtitle' lines={ 3 } trimWhitespace={ true }>{ subtitle }</Truncate>
      </div>
    );
  }
}

TitleWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

