import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import * as tracking from 'utils/tracking';
import style from './popup-wrapper.sass';
import { generatePopupId } from 'utils/popup';


export default class PopupWrapper extends Component {
  constructor(props) {
    super(props);
    this.tooltipId = generatePopupId();
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
    const { trackingUrl, trackingId } = this.props;
    this.hideOtherPopups();
    tracking.trackPopupButtonClick(trackingUrl, trackingId);
  }

  render() {
    const { children, className, popupButtonClassName } = this.props;
    return (
      <span className={ cx(style.popupWrapper, className, 'no-print') }>
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
              className='popup-close-button'
              data-tip={ true }
              data-for={ this.tooltipId }
              data-event={ true }
              data-event-off='click'
            />
            { children }
          </div>
        </ReactTooltip>
        <div
          data-tip={ true }
          data-for={ this.tooltipId }
          data-event='click'
          className={ cx('popup-button', popupButtonClassName) }
        />
      </span>
    );
  }
}

PopupWrapper.propTypes = {
  children: PropTypes.node,
  trackingUrl: PropTypes.string,
  trackingId: PropTypes.string,
  className: PropTypes.string,
  popupButtonClassName: PropTypes.string,
};
