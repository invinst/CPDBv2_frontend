import React, { PropTypes } from 'react';
import baseStyle from './hoverable-edit-wrapper.sass';


export default function HoverableEditWrapper(props) {
  const { children, style, className } = props;
  const {
    editModeOn, sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode, onSaveForm,
  } = this.context;

  if (editModeOn) {
    return (
      <div
        style={ { ...style } }
        className={ `${ baseStyle.hoverableEditWrapper } hoverable ${ className }` }
      >
        {
          sectionEditModeOn
            ? (
              <span className='bottom-button-wrapper'>
                <a className='hoverable-edit-wrapper-button' onClick={ onSaveForm }>
                  Save
                </a>
                <a className='hoverable-edit-wrapper-button' onClick={ turnOffSectionEditMode }>
                  Cancel
                </a>
              </span>
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

HoverableEditWrapper.contextTypes = {
  editModeOn: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  onSaveForm: PropTypes.func,
};
