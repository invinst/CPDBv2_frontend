import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import styles from './manage-pinboards-buttons.sass';


export default class ManagePinboardsButtons extends Component {
  constructor(props) {
    super(props);

    this.handleShowPinboardList = this.handleShowPinboardList.bind(this);
  }

  handleShowPinboardList(e) {
    const { showPinboardsList } = this.props;

    showPinboardsList(true);
    e.stopPropagation();
  }

  render() {
    return (
      <div className={ styles.managePinboardsButtons }>
        <a className='new-pinboard-btn' />
        <a onClick={ this.handleShowPinboardList } className='pinboards-list-btn' />
      </div>
    );
  }
}

ManagePinboardsButtons.propTypes = {
  showPinboardsList: PropTypes.func,
};

ManagePinboardsButtons.defaultProps = {
  showPinboardsList: noop,
};
