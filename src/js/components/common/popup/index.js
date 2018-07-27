import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';
import ReactMarkdown from 'react-markdown';

import {
  buttonStyle,
  tooltipTitleStyle,
  tooltipTextStyle,
  tooltipCloseButtonStyle,
} from './popup.style';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


export default class Popup extends Component {
  render() {
    const { text, title, position, style } = this.props;
    const tooltipId = `tooltip-${uuid()}`;
    return (
      <span>
        <ReactTooltip
          id={ tooltipId }
          className='popup'
          effect='solid'
          type='light'
          globalEventOff='click'
        >
          <div className='test--popup-content' onClick={ e => e.stopPropagation() }>
            <div
              style={ tooltipCloseButtonStyle }
              className='test--popup-close-button'
              data-tip={ true }
              data-for={ tooltipId }
              data-event={ true }
              data-event-off='click'
            />
            <div style={ tooltipTitleStyle } className='test--popup-title'>{ title }</div>
            <div style={ tooltipTextStyle } className='test--popup-text'>
              <ReactMarkdown source={ text } renderers={ { link: MarkdownLink } } />
            </div>
          </div>
        </ReactTooltip>
        <div
          style={ { ...buttonStyle(position), ...style } }
          data-tip={ true }
          data-for={ tooltipId }
          data-event='click'
          className='test--popup-button'
        />
      </span>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  position: PropTypes.string,
};

Popup.defaultProps = {
  style: {},
};
