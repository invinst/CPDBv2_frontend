import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import MarkdownLink from 'components/common/markdown-renderers/markdown-link';
import style from './popup.sass';
import PopupWrapper from './popup-wrapper';


export default class Popup extends Component {
  render() {
    const { text, title, popupButtonClassName, className, url } = this.props;
    return (
      <PopupWrapper
        popupButtonClassName={ popupButtonClassName }
        className={ `${style.popup} ${className}` }
        trackingUrl={ url }
        trackingId={ title }
      >
        <div className='tooltip-title'>{ title }</div>
        <div className='tooltip-text'>
          <ReactMarkdown source={ text } renderers={ { link: MarkdownLink } } />
        </div>
      </PopupWrapper>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  popupButtonClassName: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};

Popup.defaultProps = {
  style: {},
};
