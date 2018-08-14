import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import HoverableButton from 'components/common/hoverable-button';
import {
  wrapperStyle, bottomButtonWrapperStyle, topButtonWrapperStyle, buttonStyle, hoverableWrapperStyle
} from './hoverable-edit-wrapper.style';


class HoverableEditWrapper extends Component {
  render() {
    const {
      children, hovering, style
    } = this.props;
    const {
      editModeOn, sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode, onSaveForm
    } = this.context;

    if (editModeOn) {
      return (
        <div style={ { ...wrapperStyle(hovering), ...style } }>
          {
            sectionEditModeOn
              ? (
                <span style={ bottomButtonWrapperStyle(hovering) }>
                  <HoverableButton
                    className='test--edit-wrapper-save-button'
                    style={ buttonStyle }
                    onClick={ onSaveForm }>
                    Save
                  </HoverableButton>
                  <HoverableButton
                    className='test--edit-wrapper-cancel-button'
                    style={ buttonStyle }
                    onClick={ turnOffSectionEditMode }>
                    Cancel
                  </HoverableButton>
                </span>
                )
              : (
                <span style={ topButtonWrapperStyle(hovering) }>
                  <HoverableButton
                    className='test--edit-wrapper-edit-button'
                    style={ buttonStyle }
                    onClick={ turnOnSectionEditMode }>
                    Edit
                  </HoverableButton>
                </span>
                )
          }
          { children }
        </div>
      );
    }
    return (
      <div style={ wrapperStyle() }>{ children }</div>
    );
  }
}

HoverableEditWrapper.propTypes = {
  hovering: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

HoverableEditWrapper.contextTypes = {
  editModeOn: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  onSaveForm: PropTypes.func
};

export default Hoverable(HoverableEditWrapper, 'div', hoverableWrapperStyle);
