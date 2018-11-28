import 'popup.css';

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
import * as GATracking from 'utils/google_analytics_tracking';


export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.tooltipId = `tooltip-${uuid()}`;
    this.hideOtherPopups = this.hideOtherPopups.bind(this);
    this.afterShow = this.afterShow.bind(this);
  }

  /* istanbul ignore next */
  hideOtherPopups() {
    // We have live test for this function, so it's safe to ignore it
    const popups = document.getElementsByClassName('popup-button');
    for (let i = 0; i < popups.length; i++) {
      if (popups[i].getAttribute('data-for') !== this.tooltipId) {
        ReactTooltip.hide(popups[i]);
      }
    }
  }

  afterShow() {
    const { url, title } = this.props;
    this.hideOtherPopups();
    GATracking.trackPopupButtonClick(url, title);
  }

  render() {
    const { text, title, position, style } = this.props;
    return (
      <span className='no-print'>
        <ReactTooltip
          id={ this.tooltipId }
          className='popup'
          effect='solid'
          type='light'
          globalEventOff='click'
          afterShow={ this.afterShow }
        >
          <div className='test--popup-content' onClick={ e => e.stopPropagation() }>
            <div
              style={ tooltipCloseButtonStyle }
              className='test--popup-close-button'
              data-tip={ true }
              data-for={ this.tooltipId }
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
          data-for={ this.tooltipId }
          data-event='click'
          className='popup-button'
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
  url: PropTypes.string,
};

Popup.defaultProps = {
  style: {},
};
