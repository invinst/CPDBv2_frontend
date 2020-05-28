import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import styles from './pinboards.sass';
import withOverlay from 'components/common/with-overlay';
import SlideMotion from 'components/animation/slide-motion';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardItem from './pinboard-item';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';


class Pinboards extends Component {
  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard, handleClose } = this.props;

    createNewEmptyPinboard().then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });
  };

  render() {
    const { pinboards, isShown, duplicatePinboard, handleClose } = this.props;

    return (
      <SlideMotion show={ isShown }>
        <div className={ styles.pinboards }>
          <div className='pinboards-title'>
            Pinboards
            <PinboardLinkContainer
              className='new-pinboard-btn'
              title='Add new'
              onClick={ this.handleCreateNewEmptyPinboard } />
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
