import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import baseStyle from './hoverable-edit-wrapper.sass';
import { EditModeContext, EditWrapperStateContext } from 'contexts';


export default function HoverableEditWrapper(props) {
  const { children, style, className } = props;
  const {
    sectionEditModeOn,
    turnOnSectionEditMode,
    turnOffSectionEditMode,
    onSaveForm,
    autoSave,
  } = useContext(EditWrapperStateContext);
  const { editModeOn } = useContext(EditModeContext);

  if (editModeOn) {
    return (
      <div
        style={ { ...style } }
        className={ `${ baseStyle.hoverableEditWrapper } hoverable ${ className }` }
      >
        {
          sectionEditModeOn
            ? (
              !autoSave && (
                <span className='bottom-button-wrapper'>
                  <a className='hoverable-edit-wrapper-button' onClick={ onSaveForm }>
                    Save
                  </a>
                  <a className='hoverable-edit-wrapper-button' onClick={ turnOffSectionEditMode }>
                    Cancel
                  </a>
                </span>
              )
            ) : (
              <span className='top-button-wrapper'>
                <a className='hoverable-edit-wrapper-button edit-button' onClick={ turnOnSectionEditMode }>
                  Edit
                </a>
              </span>
            )
        }
        { children }
      </div>
    );
  }
  return (
    <div className={ `${baseStyle.hoverableEditWrapper} ${className}` }>{ children }</div>
  );
}

HoverableEditWrapper.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

HoverableEditWrapper.defaultProps = {
  className: '',
};
