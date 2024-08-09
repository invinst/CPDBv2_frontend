import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, noop } from 'lodash';
// import cx from 'classnames';

// import styles from './manage-pinboards-buttons.sass';
import { redirectToCreatedPinboard } from 'utils/pinboard';
// import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import { showIntercomLauncher } from 'utils/intercom';


export default class ManagePinboardsButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewPinboardMenu: false,
    };
  }

  handleShowPinboardList = e => {
    const { showPinboardsList } = this.props;

    showPinboardsList(true);
    showIntercomLauncher(false);
    e.stopPropagation();
  };

  toggleShowNewPinboardMenu = e => {
    this.setState((state, props) => ({
      showNewPinboardMenu: !state.showNewPinboardMenu,
    }));

    e.stopPropagation();
  };

  handleCreateNewEmptyPinboard = e => {
    const { createNewEmptyPinboard } = this.props;

    createNewEmptyPinboard().then(redirectToCreatedPinboard);
    e.stopPropagation();
  };

  handleDuplicatePinboard = e => {
    const { pinboardId, duplicatePinboard } = this.props;

    if (!isEmpty(pinboardId)) {
      duplicatePinboard(pinboardId).then(redirectToCreatedPinboard);
    }
    e.stopPropagation();
  };

  render() {
    //const { showNewPinboardMenu } = this.state;

    return (null);
    // (
    //   <div className={ styles.managePinboardsButtons }>
    //     <div className='new-pinboard-btn-container'>
    //       <a
    //         className={ cx('new-pinboard-menu-btn', { 'close-btn': showNewPinboardMenu }) }
    //         onClick={ this.toggleShowNewPinboardMenu }
    //       />
    //       {
    //         showNewPinboardMenu && (
    //           <div className='new-pinboard-menu'>
    //             <PinboardLinkContainer
    //               className='menu-item new-pinboard-link'
    //               onClick={ this.handleCreateNewEmptyPinboard }>
    //               Create new pinboard
    //             </PinboardLinkContainer>
    //             <PinboardLinkContainer
    //               className='menu-item duplicate-current-pinboard-link'
    //               onClick={ this.handleDuplicatePinboard }>
    //               Duplicate this pinboard
    //             </PinboardLinkContainer>
    //           </div>
    //         )
    //       }
    //     </div>
    //     <a className='pinboards-list-btn' onClick={ this.handleShowPinboardList } />
    //   </div>
    // );
  }
}

ManagePinboardsButtons.propTypes = {
  pinboardId: PropTypes.string,
  showPinboardsList: PropTypes.func,
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
};

ManagePinboardsButtons.defaultProps = {
  showPinboardsList: noop,
  createNewEmptyPinboard: noop,
  duplicatePinboard: noop,
};
