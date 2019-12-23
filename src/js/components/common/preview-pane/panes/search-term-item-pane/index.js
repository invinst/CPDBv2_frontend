import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import ReactMarkdown from 'react-markdown';

import { descriptionStyle, titleStyle, wrapperStyle } from './preview-pane.style.js';
import SlideMotion from 'components/animation/slide-motion';
import CallToAction from './call-to-action';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


export default function SearchTermItemPane(props) {
  const { name, description, to, url, callToActionType } = props;

  return (
    <SlideMotion show={ !isEmpty(name) } offsetX={ 100 }>
      <div style={ wrapperStyle }>
        <div className='test--preview-pane-title' style={ titleStyle }>
          { name }
        </div>
        <div className='test--preview-pane-description' style={ descriptionStyle }>
          <ReactMarkdown source={ description } renderers={ { link: MarkdownLink } }/>
        </div>
        <CallToAction to={ to } url={ url } name={ name } callToActionType={ callToActionType } />
      </div>
    </SlideMotion>
  );

}

SearchTermItemPane.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  to: PropTypes.string,
  url: PropTypes.string,
  callToActionType: PropTypes.string,
};
