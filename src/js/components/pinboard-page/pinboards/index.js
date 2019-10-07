import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import styles from './pinboards.sass';
import withOverlay from 'components/common/with-overlay';
import SlideMotion from 'components/animation/slide-motion';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardItem from './pinboard-item';


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

  render() {
    const { pinboards, isShown, duplicatePinboard, handleClose } = this.props;

    return (
      <SlideMotion show={ isShown } offsetX={ 100 }>
        <div className={ styles.pinboards }>
          <div className='pinboards-title'>
            Pinboards
            <a className='new-pinboard-btn' title='Add new' onClick={ this.handleCreateNewEmptyPinboard } />
          </div>
          {
            pinboards.map((pinboard) => (
              <PinboardItem
                key={ pinboard.id }
                pinboard={ pinboard }
                duplicatePinboard={ duplicatePinboard }
                handleClose={ handleClose }
              />
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
