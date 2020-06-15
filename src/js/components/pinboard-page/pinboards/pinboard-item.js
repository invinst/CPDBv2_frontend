import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';
import cx from 'classnames';

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
    handleSetShowActionsPinboardId(shouldShowActions ? null : id);
  };

  render() {
    const {
      pinboard: { title, createdAt, lastViewedAt, isCurrent },
      shouldShowActions,
    } = this.props;

    return (
      <div className={ cx('pinboard-item', { 'is-current': isCurrent }) }>
        <PinboardLinkContainer
          className={ 'pinboard-info' }
          customComponent='div' onClick={ this.handlePinboardItemClick }
        >
          <div className='pinboard-title'>{ title || `Created ${createdAt}` }</div>
          <div className='pinboard-viewed-at'>Viewed { lastViewedAt }</div>
        </PinboardLinkContainer>
        <div className='pinboard-item-actions-container'>
          <div
            className={ cx('pinboard-item-actions-btn', { 'focused': shouldShowActions }) }
            onClick={ this.handleActionsBtnClick }
          />
          {
            shouldShowActions && (
              <div className='pinboard-item-actions-menu'>
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
  duplicatePinboard: PropTypes.func,
  removePinboard: PropTypes.func,
  shouldShowActions: PropTypes.bool,
  handleSetShowActionsPinboardId: PropTypes.func,
};

PinboardItem.defaultProps = {
  duplicatePinboard: noop,
  removePinboard: noop,
  shouldShowActions: false,
  handleSetShowActionsPinboardId: noop,
};
