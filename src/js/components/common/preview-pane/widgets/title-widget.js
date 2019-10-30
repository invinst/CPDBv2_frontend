import React, { Component, PropTypes } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import styles from './title-widget.sass';


export default class HeaderWidget extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className={ styles.titleWidget }>
        <div className='header-widget-title'>{ title }</div>
        <LinesEllipsis
          className='header-widget-subtitle'
          text={ subtitle }
          maxLine={ 3 }
          basedOn='words'
          style={ { whiteSpace: 'pre-wrap' } }
        />
      </div>
    );
  }
}

HeaderWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

