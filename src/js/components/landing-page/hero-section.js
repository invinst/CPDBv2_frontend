import React, { Component, PropTypes } from 'react';

import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditableSection from 'components/inline-editable/editable-section';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import {
  wrapperStyle, leftColumnWrapperStyle, rightColumnWrapperStyle, sunburstGraphicStyle,
  heroTitleStyle, heroComplaintTextStyle, heroUseOfForceStyle, editToggleStyle, outerWrapperStyle
} from './hero-section.style';


export class HeroSection extends Component {
  render() {
    const { editToggleProps, fieldProps } = this.props;

    return (
      <div style={ outerWrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ wrapperStyle }>
            <div style={ leftColumnWrapperStyle }>
              <div style={ sunburstGraphicStyle }></div>
            </div>
            <div style={ rightColumnWrapperStyle }>
              <div style={ heroTitleStyle }>
                <RichTextEditable
                  { ...fieldProps['hero_title'] }/>
              </div>
              <div style={ heroComplaintTextStyle }>
                <RichTextEditable
                  { ...fieldProps['hero_complaint_text'] }/>
              </div>
              <div style={ heroUseOfForceStyle }>
                <RichTextEditable
                  { ...fieldProps['hero_use_of_force_text'] }/>
              </div>
            </div>
            <div style={ editToggleStyle }>
              <EditToggle { ...editToggleProps }/>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

HeroSection.propTypes = {
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object
};

HeroSection.defaultProps = {
  fieldProps: {}
};

export default EditableSection(HeroSection);
