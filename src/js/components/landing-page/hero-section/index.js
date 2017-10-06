import React, { Component, PropTypes } from 'react';

import EditableSection from 'components/inline-editable/editable-section';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import SunburstGraphic from './sunburst-graphic';
import TextColumn from './text-column';
import { wrapperStyle, editToggleStyle, outerWrapperStyle } from './hero-section.style';

export class HeroSection extends Component {
  render() {
    const { editToggleProps, fieldProps } = this.props;

    return (
      <div style={ outerWrapperStyle } className='test--hero-section'>
        <ResponsiveFluidWidthComponent>
          <div style={ wrapperStyle }>
            <SunburstGraphic />
            <TextColumn fieldProps={ fieldProps }/>
            <div style={ editToggleStyle }>
              <EditToggle { ...editToggleProps }/>
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
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
