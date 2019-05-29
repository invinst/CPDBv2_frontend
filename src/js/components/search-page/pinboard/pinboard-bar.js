import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import styles from './pinboard-bar.sass';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';

const PINBOARD_TIP = 'Create collections of officers, complaint records, \
  and tactical reponse reports using search.';


export default class PinboardBar extends Component {
  render() {
    const { onEmptyPinboardButtonClick } = this.props;

    return (
      <div className={ styles.wrapper }>
        <span className='pinboard-tip'>
          { PINBOARD_TIP }
        </span>
        <PinboardButtonContainer onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }/>
      </div>
    );
  }
}

PinboardBar.propTypes = {
  onEmptyPinboardButtonClick: PropTypes.func,
};

PinboardBar.defaultProps = {
  onEmptyPinboardButtonClick: noop,
};
