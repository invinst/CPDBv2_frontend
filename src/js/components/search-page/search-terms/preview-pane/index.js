import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import ReactMarkdown from 'react-markdown';

import { descriptionStyle, titleStyle, wrapperStyle } from './preview-pane.style.js';
import SlideMotion from 'components/animation/slide-motion';
import CallToAction from './call-to-action';
import MarkdownLink from './markdown-renderers/markdown-link';


export default class PreviewPane extends Component {

  render() {
    const { item } = this.props;

    return (
      <SlideMotion show={ !isEmpty(item.name) } offsetX={ 100 }>
        <div style={ wrapperStyle }>
          <div className='test--preview-pane-title' style={ titleStyle }>
            { item.name }
          </div>
          <div className='test--preview-pane-description' style={ descriptionStyle }>
            <ReactMarkdown source={ item.description } renderers={ { link: MarkdownLink } }/>
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
