import PropTypes from 'prop-types';
import React from 'react';

import styles from './pinboard-info.sass';
import AutosaveMarkdownTextareaInput from 'components/common/autosave-inputs/autosave-markdown-textarea-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


export default function PinboardInfo(props) {
  const { pinboard, updatePinboardInfo } = props;
  return (null);
}

PinboardInfo.propTypes = {
  pinboard: PropTypes.object,
  updatePinboardInfo: PropTypes.func,
};

/* <div className={ styles.pinboardInfo }>
      <AutosaveTextareaInput
        className='pinboard-title'
        value={ pinboard.title } */
      //   placeholder='Give your pinboard a title'
      //   fieldType='title'
      //   save={ updatePinboardInfo }
      //   textareaLineHeight={ 31 }
      // />
      // <AutosaveMarkdownTextareaInput
      //   className='pinboard-description'
      //   placeholderClassName='pinboard-description-placeholder'
      //   value={ pinboard.description }
      //   placeholder='When you’re ready, add a description for your pinboard here'
      //   fieldType='description'
    //     save={ updatePinboardInfo }
    //     textareaLineHeight={ 16 }
    //   />
    // </div>
