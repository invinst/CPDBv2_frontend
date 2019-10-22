import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';

import { redirectToCreatedPinboard } from 'utils/pinboard';
import { browserHistory } from 'react-router';


export default class PinboardItem extends Component {
  constructor(props) {
    super(props);

    this.handleDuplicatePinboard = this.handleDuplicatePinboard.bind(this);
    this.handlePinboardItemClick = this.handlePinboardItemClick.bind(this);
  }

  handleDuplicatePinboard(e) {
    const { pinboard, duplicatePinboard, handleClose } = this.props;

    duplicatePinboard(pinboard.id).then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });

    e.stopPropagation();
  }

  handlePinboardItemClick() {
    const { handleClose, pinboard } = this.props;

    handleClose();
    browserHistory.push(pinboard.url);
  }

  render() {
    const { pinboard } = this.props;

    return (
      <div
        className={ cx('pinboard-item', { 'untitled-pinboard': isEmpty(pinboard.title) }) }
        onClick={ this.handlePinboardItemClick }
      >
        <div className='pinboard-info'>
          <div className='pinboard-title'>{ pinboard.title }</div>
          <div className='pinboard-created-at'>Created { pinboard.createdAt }</div>
        </div>
        <a
          className='duplicate-pinboard-btn'
          title='Duplicate'
          onClick={ this.handleDuplicatePinboard } />
      </div>
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
