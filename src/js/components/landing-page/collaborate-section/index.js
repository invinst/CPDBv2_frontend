import React, { Component, PropTypes } from 'react';

import {
  paragraphStyle, underlinedLinkStyle, contentStyle, paragraphWrapperStyle,
  wrapperStyle, headerStyle, editBoxStyle
} from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import EditableSection from 'components/inline-editable/editable-section';

class CollaborateSection extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapper: paragraphWrapperStyle.extraWide,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.extraWide },
        underlineLink: { ...paragraphStyle.base, ...paragraphStyle.extraWide, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.extraWide }
      },
      [DESKTOP]: {
        wrapper: paragraphWrapperStyle.desktop,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.desktop },
        underlineLink: { ...paragraphStyle.base, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.desktop }
      },
      [TABLET]: {
        wrapper: paragraphWrapperStyle.tablet,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.tablet },
        underlineLink: { ...paragraphStyle.base, ...paragraphStyle.tablet, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.tablet }
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { editToggleProps, fieldProps } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ style.header }>
          <div style={ editBoxStyle }>
            <RichTextEditable { ...fieldProps['collaborate_header'] }/>
          </div>
          <EditToggle { ...editToggleProps }/>
        </div>
        <div style={ contentStyle }>
          <RichTextEditable { ...fieldProps['collaborate_content'] } style={ {
            wrapper: style.wrapper,
            paragraph: style.paragraph
          } }/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

CollaborateSection.propTypes = {
  editToggleProps: PropTypes.object,
  fieldProps: PropTypes.object
};

export default EditableSection(CollaborateSection);
