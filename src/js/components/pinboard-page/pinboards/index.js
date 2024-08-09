import PropTypes from 'prop-types';
import { Component } from 'react';
import { noop } from 'lodash';

// import styles from './pinboards.sass';
import withOverlay from 'components/common/with-overlay';
// import SlideMotion from 'components/animation/slide-motion';
import { redirectToCreatedPinboard } from 'utils/pinboard';
// import PinboardItem from './pinboard-item';
// import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import { PINBOARD_ACTIONS_PANE_SPACE } from 'utils/constants';


class Pinboards extends Component {
  state = { showActionsPinboardId: null, actionsPanePosition: 'bottom' };

  static getDerivedStateFromProps(props, state) {
    if (!props.isShown) {
      return { showActionsPinboardId: null };
    }
    return null;
  }

  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard, handleClose } = this.props;

    createNewEmptyPinboard().then((response) => {
      handleClose();
      redirectToCreatedPinboard(response);
    });
  };

  handleSetShowActionsPinboardId = (pinboardId, actionsButtonBottom) => {
    if (pinboardId) {
      const { bottom: modalBottom } = this.pinboards.getBoundingClientRect();
      const actionsPaneSpace = modalBottom - actionsButtonBottom;
      this.setState({
        showActionsPinboardId: pinboardId,
        actionsPanePosition: actionsPaneSpace > PINBOARD_ACTIONS_PANE_SPACE ? 'bottom' : 'top',
      });
    } else {
      this.setState({ showActionsPinboardId: null });
    }
  };

  render() {
    // const { pinboards, isShown, duplicatePinboard, removePinboard, handleClose } = this.props;
    // const { showActionsPinboardId, actionsPanePosition } = this.state;

    return (null); 
    // (
    //   <SlideMotion show={ isShown }>
    //     <div className={ styles.pinboards } ref={ el => this.pinboards = el }>
    //       <div className='pinboards-title'>
    //         Pinboards
    //         <PinboardLinkContainer
    //           className='new-pinboard-btn'
    //           title='Add new'
    //           onClick={ this.handleCreateNewEmptyPinboard } />
    //       </div>
    //       {
    //         pinboards.map((pinboard) => (
    //           <PinboardItem
    //             key={ pinboard.key }
    //             pinboard={ pinboard }
    //             actionsPanePosition={ actionsPanePosition }
    //             duplicatePinboard={ duplicatePinboard }
    //             removePinboard={ removePinboard }
    //             shouldShowActions={ pinboard.id === showActionsPinboardId }
    //             handleSetShowActionsPinboardId={ this.handleSetShowActionsPinboardId }
    //             handleClose={ handleClose }
    //           />
    //         ))
    //       }
    //     </div>
    //   </SlideMotion>
    // );
  }
}

Pinboards.propTypes = {
  pinboards: PropTypes.array,
  isShown: PropTypes.bool,
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  removePinboard: PropTypes.func,
  handleClose: PropTypes.func,
};

Pinboards.defaultProps = {
  pinboards: [],
  isShown: false,
  createNewEmptyPinboard: noop,
  duplicatePinboard: noop,
  removePinboard: noop,
  handleClose: noop,
};

export default withOverlay(Pinboards);
