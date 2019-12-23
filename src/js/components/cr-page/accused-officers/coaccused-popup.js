import React, { PropTypes } from 'react';

import PopupWrapper from 'components/common/popup/popup-wrapper';
import style from './coaccused-popup.sass';


export default function CoaccusedPopup(props) {
  const { finding, outcome, recommendedOutcome } = props;
  return (
    <PopupWrapper
      className={ style.coaccusedPopup }
      popupButtonClassName='bottom-popup-button'
    >
      <div className='coaccused-popup-title'>ADDITIONAL INFORMATION</div>
      <div className='coaccused-popup-row'>
        <span className='coaccused-popup-row-label'>Final Finding</span>
        <span className='coaccused-popup-row-value'>{ finding }</span>
      </div>
      <div className='coaccused-popup-row'>
        <span className='coaccused-popup-row-label'>Recommended Outcome</span>
        <span className='coaccused-popup-row-value'>{ recommendedOutcome }</span>
      </div>
      <div className='coaccused-popup-row'>
        <span className='coaccused-popup-row-label'>Final Outcome</span>
        <span className='coaccused-popup-row-value'>{ outcome }</span>
      </div>
    </PopupWrapper>
  );
}

CoaccusedPopup.propTypes = {
  finding: PropTypes.string,
  outcome: PropTypes.string,
  recommendedOutcome: PropTypes.string,
};
