import PropTypes from 'prop-types';
import React from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import marked from 'marked';

import { ELLIPSIS_CONFIG } from 'utils/constants';
import styles from './title-widget.sass';


export default function TitleWidget({ title, subtitle }) {
  return (
    <div className={ styles.titleWidget }>
      <div className='title-widget-title'>{ title }</div>
      <HTMLEllipsis
        { ...ELLIPSIS_CONFIG }
        className='title-widget-subtitle'
        unsafeHTML={ marked(subtitle) }
      />
    </div>
  );
}

TitleWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

