import React, { Component, PropTypes } from 'react';

import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import EditableSection from 'components/inline-editable/editable-section';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  paragraphStyle, contentWrapperStyle, wrapperStyle, headerStyle,
  contentStyle, editBoxStyle
} from './about-section.style';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


class AboutSection extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.extraWide },
        header: { ...headerStyle.base, ...headerStyle.extraWide },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.extraWide }
      },
      [DESKTOP]: {
        paragraph: paragraphStyle.base,
        header: { ...headerStyle.base, ...headerStyle.desktop },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.desktop }
      },
      [TABLET]: {
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.tablet },
        header: { ...headerStyle.base, ...headerStyle.tablet },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.tablet }
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { editToggleProps, fieldProps } = this.props;

    return (
      <div style={ style.wrapper }>
        <div style={ style.header }>
          <div style={ editBoxStyle }>
            <RichTextEditable { ...fieldProps['about_header'] }/>
          </div>
          <EditToggle { ...editToggleProps }/>
        </div>
        <div style={ contentStyle }>
          <RichTextEditable { ...fieldProps['about_content'] } style={ {
            wrapper: contentWrapperStyle,
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

AboutSection.propTypes = {
  editToggleProps: PropTypes.object,
  fieldProps: PropTypes.object
};

export default EditableSection(AboutSection);
