import React, { PropTypes } from 'react';
import { noop } from 'lodash';
import cx from 'classnames';

import styles from './pinboard-bar.sass';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';

const PINBOARD_TIP = 'Create collections of officers, complaint records, \
  and tactical reponse reports using search.';


export default function PinboardBar(props) {
  const { onEmptyPinboardButtonClick } = props;

  return (
    <div className={ cx('pinboard-feature', styles.wrapper) }>
      <span className='pinboard-tip'>
        { PINBOARD_TIP }
      </span>
      <PinboardButtonContainer onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }/>
    </div>
  );
}

PinboardBar.propTypes = {
  onEmptyPinboardButtonClick: PropTypes.func,
};

PinboardBar.defaultProps = {
  onEmptyPinboardButtonClick: noop,
};
