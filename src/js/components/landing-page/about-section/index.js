import React, { PropTypes } from 'react';

import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import MultilineTextEditable from 'components/inline-editable/editable-section/multiline-text-editable';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import EditableSection from 'components/inline-editable/editable-section';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  paragraphStyle, contentWrapperStyle, wrapperStyle, headerStyle,
  contentStyle, editBoxStyle
} from './about-section.style';


class AboutSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.extraWide },
        header: { ...headerStyle.base, ...headerStyle.extraWide }
      },
      [DESKTOP]: {
        paragraph: paragraphStyle.base,
        header: { ...headerStyle.base, ...headerStyle.desktop }
      },
      [TABLET]: {
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.tablet },
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
            <PlainTextEditable { ...fieldProps['about_header'] }/>
          </div>
          <EditToggle { ...editToggleProps }/>
        </div>
        <div style={ contentStyle }>
          <MultilineTextEditable { ...fieldProps['about_content'] } style={ {
            wrapper: contentWrapperStyle,
            paragraph: style.paragraph
          } }/>
        </div>
      </div>
    );
  }
}

AboutSection.propTypes = {
  editToggleProps: PropTypes.object,
  fieldProps: PropTypes.object
};

export default EditableSection(AboutSection);
