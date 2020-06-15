import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import browserHistory from 'utils/history';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';


export default class PinboardItem extends Component {
  handleDuplicatePinboard = e => {
    const { pinboard, duplicatePinboard, handleSetShowActionsPinboardId } = this.props;
    duplicatePinboard(pinboard.id).then((response) => {
      redirectToCreatedPinboard(response);
    });
    handleSetShowActionsPinboardId(null);
  };

  handleRemovePinboard = e => {
    const { pinboard: { id }, removePinboard } = this.props;
    removePinboard(id);
  };

  handlePinboardItemClick = () => {
    const { pinboard } = this.props;
    if (!pinboard.isCurrent) {
      browserHistory.push(pinboard.url);
    }
  };

  handleActionsBtnClick = (e) => {
    const { handleSetShowActionsPinboardId, shouldShowActions, pinboard: { id } } = this.props;
    if (id) {
      if (shouldShowActions) {
        handleSetShowActionsPinboardId(null);
      } else {
        const { bottom } = this.actionsBtn.getBoundingClientRect();
        handleSetShowActionsPinboardId(id, bottom);
      }
    }
  };

  getTitle() {
    const {
      pinboard: { title, createdAt, hasTitlePendingChange },
    } = this.props;
    return hasTitlePendingChange ? 'Updating pinboard title...' : (title || `Created ${createdAt}`);
  }

  render() {
    const {
      pinboard: { lastViewedAt, isCurrent, hasPendingChanges, hasTitlePendingChange },
      shouldShowActions,
      actionsPanePosition,
    } = this.props;

    return (
      <div className={ cx('pinboard-item', { 'is-current': isCurrent }) }>
        {
          hasPendingChanges &&
            <img src='/img/pinboard-loading-spinner.svg' className='spinner' alt='spinner' />
        }
        <PinboardLinkContainer
          className={ cx('pinboard-info', { 'has-loading-spinner': hasPendingChanges }) }
          customComponent='div' onClick={ this.handlePinboardItemClick }
        >
          <div className='pinboard-title'>{ this.getTitle() }</div>
          {
            lastViewedAt && !hasTitlePendingChange && <div className='pinboard-viewed-at'>Viewed { lastViewedAt }</div>
          }
        </PinboardLinkContainer>
        <div className='pinboard-item-actions-container'>
          <div
            className={ cx('pinboard-item-actions-btn', { 'focused': shouldShowActions }) }
            onClick={ this.handleActionsBtnClick }
            ref={ el => this.actionsBtn = el }
          />
          {
            shouldShowActions && (
              <div className={ cx('pinboard-item-actions-menu', actionsPanePosition) }>
                <PinboardLinkContainer
                  customComponent='div'
                  className='duplicate-pinboard-btn'
                  onClick={ this.handleDuplicatePinboard }
                >
                  Duplicate
                </PinboardLinkContainer>
                <div className='remove-pinboard-btn' onClick={ this.handleRemovePinboard }>Remove</div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

PinboardItem.propTypes = {
  pinboard: PropTypes.object,
  handleClose: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  removePinboard: PropTypes.func,
  handleSetShowActionsPinboardId: PropTypes.func,
  shouldShowActions: PropTypes.bool,
  hasTitlePendingChange: PropTypes.bool,
  actionsPanePosition: PropTypes.string,
};

PinboardItem.defaultProps = {
  pinboard: {},
  handleClose: noop,
  duplicatePinboard: noop,
  removePinboard: noop,
  handleSetShowActionsPinboardId: noop,
  shouldShowActions: false,
  hasTitlePendingChange: false,
  actionsPanePosition: 'bottom',
};
