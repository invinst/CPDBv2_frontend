import React, { PropTypes } from 'react';

import styles from './pinboard-info.sass';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


export default function PinboardInfo(props) {
  const { pinboard, updatePinboardInfo } = props;
  return (
    <div className={ styles.pinboardInfo }>
      <AutosaveTextareaInput
        className='pinboard-title'
        value={ pinboard.title }
        placeholder='Give your pinboard a title'
        fieldType='title'
        save={ updatePinboardInfo }
        textareaLineHeight={ 31 }
      />
      <AutosaveTextareaInput
        className='pinboard-description'
        value={ pinboard.description }
        placeholder='When you’re ready, add a description for your pinboard here'
        fieldType='description'
        save={ updatePinboardInfo }
        textareaLineHeight={ 16 }
      />
    </div>
  );
}

PinboardInfo.propTypes = {
  pinboard: PropTypes.object,
  updatePinboardInfo: PropTypes.func,
};
