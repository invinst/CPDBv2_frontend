import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import browserHistory from 'utils/history';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';


export default class PinboardItem extends Component {
  handleDuplicatePinboard = e => {
    const { pinboard, duplicatePinboard, handleClose } = this.props;

    duplicatePinboard(pinboard.id).then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });

    e.stopPropagation();
  };

  handlePinboardItemClick = () => {
    const { handleClose, pinboard } = this.props;

    handleClose();
    if (!pinboard.isCurrent) {
      browserHistory.push(pinboard.url);
    }
  };

  render() {
    const { pinboard: { title, createdAt, lastViewedAt } } = this.props;

    return (
      <PinboardLinkContainer
        customComponent='div'
        className='pinboard-item'
        onClick={ this.handlePinboardItemClick }
      >
        <div className='pinboard-info'>
          <div className='pinboard-title'>{ title || `Created ${createdAt}` }</div>
          <div className='pinboard-viewed-at'>Viewed { lastViewedAt }</div>
        </div>
        <PinboardLinkContainer
          className='duplicate-pinboard-btn'
          title='Duplicate'
          onClick={ this.handleDuplicatePinboard } />
      </PinboardLinkContainer>
    );
  }
}

PinboardItem.propTypes = {
  pinboard: PropTypes.object,
  handleClose: PropTypes.func,
  duplicatePinboard: PropTypes.func,
};

PinboardItem.defaultProps = {
  handleClose: noop,
  duplicatePinboard: noop,
};
