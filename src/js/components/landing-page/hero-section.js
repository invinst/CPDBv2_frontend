import React, { Component, PropTypes } from 'react';

import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditableSection from 'components/inline-editable/editable-section';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  wrapperStyle, leftColumnWrapperStyle, rightColumnWrapperStyle, sunburstGraphicStyle, heroTitleStyle,
  heroComplaintTextStyle, heroUseOfForceStyle
} from './hero-section.style';


class HeroSection extends Component {
  render() {
    const { fieldProps } = this.props;

    return (
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
                { ...fieldProps['hero_conplaint_text'] }/>
            </div>
            <div style={ heroUseOfForceStyle }>
              <RichTextEditable
                { ...fieldProps['hero_use_of_force_text'] }/>
            </div>
          </div>
        </div>
      </ResponsiveFixedWidthComponent>
    );
  }
}

HeroSection.propTypes = {
  fieldProps: PropTypes.object
};

export default EditableSection(HeroSection);
