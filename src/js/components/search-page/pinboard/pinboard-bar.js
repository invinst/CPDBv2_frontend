import React, { Component } from 'react';

import styles from './pinboard-bar.sass';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';

const PINBOARD_TIP = 'Create collections of officers, complaint records, \
  and tactical reponse reports using search.';


export default class PinboardBar extends Component {
  render() {
    return (
      <div className={ styles.wrapper }>
        <span className='pinboard-tip'>
          { PINBOARD_TIP }
        </span>
        <PinboardButtonContainer />
      </div>
    );
  }
}
