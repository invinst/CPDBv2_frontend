import React, { PropTypes, Component } from 'react';
import baseStyle from './hoverable-edit-wrapper.sass';


export default class HoverableEditWrapper extends Component {
  render() {
    const { children, style, className } = this.props;
    const {
      editModeOn, sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode, onSaveForm, autoSave,
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
  autoSave: PropTypes.bool,
  editModeOn: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  onSaveForm: PropTypes.func,
};
