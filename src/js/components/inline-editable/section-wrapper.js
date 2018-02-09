import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import HoverableButton from 'components/common/hoverable-button';
import { wrapperStyle, buttonWrapperStyle, buttonStyle } from './section-wrapper.style';


class SectionWrapper extends Component {
  render() {
    const {
      children, hovering, sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode,
      onSaveForm
    } = this.props;
    const { editModeOn } = this.context;

    if (editModeOn) {
      return (
        <div style={ wrapperStyle(hovering) }>
          {
            sectionEditModeOn
              ? (
                <span style={ buttonWrapperStyle(hovering) }>
                  <HoverableButton style={ buttonStyle } onClick={ onSaveForm }>
                    Save
                  </HoverableButton>
                  <HoverableButton style={ buttonStyle } onClick={ turnOffSectionEditMode }>
                    Cancel
                  </HoverableButton>
                </span>
                )
              : (
                <span style={ buttonWrapperStyle(hovering) }>
                  <HoverableButton style={ buttonStyle } onClick={ turnOnSectionEditMode }>
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

SectionWrapper.propTypes = {
  sectionEditModeOn: PropTypes.bool,
  hovering: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  children: PropTypes.node,
  onSaveForm: PropTypes.func
};

SectionWrapper.contextTypes = {
  editModeOn: PropTypes.bool
};

export default Hoverable(SectionWrapper);
