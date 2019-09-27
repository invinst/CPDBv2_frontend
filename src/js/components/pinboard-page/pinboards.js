import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';

import styles from './pinboards.sass';
import withOverlay from 'components/common/with-overlay';
import SlideMotion from 'components/animation/slide-motion';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import { browserHistory } from 'react-router';


class Pinboards extends Component {
  constructor(props) {
    super(props);

    this.handleCreateNewEmptyPinboard = this.handleCreateNewEmptyPinboard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isShown, fetchPinboards } = nextProps;

    if (!this.props.isShown && isShown) {
      fetchPinboards();
    }
  }

  handleCreateNewEmptyPinboard() {
    const { createNewEmptyPinboard, handleClose } = this.props;

    createNewEmptyPinboard().then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });
  }

  handleDuplicatePinboard(e, pinboardId) {
    const { duplicatePinboard, handleClose } = this.props;

    duplicatePinboard(pinboardId).then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });

    e.stopPropagation();
  }

  handlePinboardItemClick(url) {
    const { handleClose } = this.props;

    handleClose();
    browserHistory.push(url);
  }

  render() {
    const { pinboards, isShown } = this.props;

    return (
      <SlideMotion show={ isShown } offsetX={ 100 }>
        <div className={ styles.pinboards }>
          <div className='pinboards-title'>
            Pinboards
            <a className='new-pinboard-btn' title='Add new' onClick={ this.handleCreateNewEmptyPinboard } />
          </div>
          {
            pinboards.map((pinboard) => (
              <div
                key={ pinboard.id }
                className={ cx('pinboard-item', { 'untitled-pinboard': isEmpty(pinboard.title) }) }
                onClick={ () => this.handlePinboardItemClick(pinboard.url) }
              >
                <div className='pinboard-info'>
                  <div className='pinboard-title'>{ pinboard.title }</div>
                  <div className='pinboard-created-at'>Created { pinboard.createdAt }</div>
                </div>
                <a
                  className='duplicate-pinboard-btn'
                  title='Duplicate'
                  onClick={ (e) => this.handleDuplicatePinboard(e, pinboard.id) } />
              </div>
            ))
          }
        </div>
      </SlideMotion>
    );
  }
}

Pinboards.propTypes = {
  pinboards: PropTypes.array,
  fetchPinboards: PropTypes.func,
  isShown: PropTypes.bool,
  handleClose: PropTypes.func,
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
};

Pinboards.defaultProps = {
  pinboards: [],
  isShown: false,
  handleClose: noop,
  createNewEmptyPinboard: noop,
  duplicatePinboard: noop,
};

export default withOverlay(Pinboards);
