import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './title-widget.sass';


export default function TitleWidget(props) {
  const { title, subtitle } = props;
  return (
    <div className={ styles.titleWidget }>
      <div className='title-widget-title'>{ title }</div>
      <ReactMarkdown className='title-widget-subtitle' source={ subtitle }/>
    </div>
  );
}

TitleWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

