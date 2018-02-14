import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import ReactMarkdown from 'react-markdown';

import { descriptionStyle, titleStyle, wrapperStyle } from './preview-pane.style.js';
import SlideMotion from 'components/animation/slide-motion';
import CallToAction from './call-to-action';


export default class PreviewPane extends Component {

  render() {
    const { item } = this.props;

    return (
      <SlideMotion show={ !isEmpty(item.name) } offsetX={ 100 }>
        <div style={ wrapperStyle }>
          <div className='test--preview-pane-title' style={ titleStyle }>
            <ReactMarkdown source={ item.name }/>
          </div>
          <div className='test--preview-pane-description' style={ descriptionStyle }>
            <ReactMarkdown source={ item.description }/>
          </div>
          <CallToAction item={ item }/>
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  item: PropTypes.object,
};

PreviewPane.defaultProps = {
  item: {},
};
