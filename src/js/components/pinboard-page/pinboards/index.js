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
  state = { showActionsPinboardId: null };

  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard } = this.props;

    createNewEmptyPinboard().then((response) => {
      redirectToCreatedPinboard(response);
    });
  };

  handleSetShowActionsPinboardId = pinboardId => {
    this.setState({ showActionsPinboardId: pinboardId });
  };

  render() {
    const { pinboards, isShown, duplicatePinboard, removePinboard } = this.props;
    const { showActionsPinboardId } = this.state;

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
                key={ pinboard.key }
                pinboard={ pinboard }
                duplicatePinboard={ duplicatePinboard }
                removePinboard={ removePinboard }
                shouldShowActions={ pinboard.id === showActionsPinboardId }
                handleSetShowActionsPinboardId={ this.handleSetShowActionsPinboardId }
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
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  removePinboard: PropTypes.func,
};

Pinboards.defaultProps = {
  pinboards: [],
  isShown: false,
  createNewEmptyPinboard: noop,
  duplicatePinboard: noop,
  removePinboard: noop,
};

export default withOverlay(Pinboards);
