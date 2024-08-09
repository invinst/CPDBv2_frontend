import PropTypes from 'prop-types';
// import React from 'react';
import { noop } from 'lodash';
// import cx from 'classnames';

// import styles from './pinboard-bar.sass';
// import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';

const PINBOARD_TIP = 'Create collections of officers, complaint records, \
  and tactical reponse reports using search.';


export default function PinboardBar(props) {
  //const { onEmptyPinboardButtonClick, isEmptyPinboard } = props;

  return (null); 
  // (
  //   <div className={ cx('pinboard-feature', styles.wrapper, { 'slide-in': !isEmptyPinboard }) }>
  //     <span className='pinboard-tip'>
  //       { PINBOARD_TIP }
  //     </span>
  //     <PinboardButtonContainer onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }/>
  //   </div>
  // );
}

PinboardBar.propTypes = {
  onEmptyPinboardButtonClick: PropTypes.func,
  isEmptyPinboard: PropTypes.bool,
};

PinboardBar.defaultProps = {
  onEmptyPinboardButtonClick: noop,
  isEmptyPinboard: true,
};
