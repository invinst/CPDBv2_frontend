import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';
import ReactMarkdown from 'react-markdown';

import { buttonStyle, titleStyle, textStyle, titleCloseButtonStyle, titleTextStyle } from './popup.style';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


export default class Popup extends Component {
  render() {
    const { text, title, style } = this.props;
    const tooltipId = `tooltip-${uuid()}`;
    return (
      <span>
        <ReactTooltip
          id={ tooltipId }
          className='popup'
          effect='solid'
          type='light'
          offset={ { top: -10 } }
        >
          <div style={ titleStyle }>
            <span
              style={ titleCloseButtonStyle }
              data-tip={ true }
              data-for={ tooltipId }
              data-event={ true }
              data-event-off='click'
            />
            <span style={ titleTextStyle } className='test--popup-title-text'>{ title }</span>
          </div>
          <div style={ textStyle } className='test--popup-text'>
            <ReactMarkdown source={ text } renderers={ { link: MarkdownLink } }/>
          </div>
        </ReactTooltip>
        <div
          style={ { ...buttonStyle, ...style } }
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
};

Popup.defaultProps = {
  style: {},
};
