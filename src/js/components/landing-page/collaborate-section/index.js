import React, { Component, PropTypes } from 'react';

import {
  paragraphStyle, contentStyle, paragraphWrapperStyle,
  wrapperStyle, headerStyle, editBoxStyle, underlinedLinkStyle
} from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import EditableSection from 'components/inline-editable/editable-section';
import { ENTITY_LINK } from 'utils/constants';

class CollaborateSection extends Component {
  getChildContext() {
    return {
      draftEntityStyle: {
        [ENTITY_LINK]: underlinedLinkStyle()
      }
    };
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraphWrapper: paragraphWrapperStyle.extraWide,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.extraWide },
        header: { ...headerStyle.base, ...headerStyle.extraWide },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.extraWide }
      },
      [DESKTOP]: {
        paragraphWrapper: paragraphWrapperStyle.desktop,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.desktop },
        header: { ...headerStyle.base, ...headerStyle.desktop },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.desktop }
      },
      [TABLET]: {
        paragraphWrapper: paragraphWrapperStyle.tablet,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.tablet },
        header: { ...headerStyle.base, ...headerStyle.tablet },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.tablet }
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { editToggleProps, fieldProps } = this.props;

    return (
      <div style={ style.wrapper } className='test--collaborate-section'>
        <div style={ style.header } className='test--collaborate-section-header'>
          <div style={ editBoxStyle }>
            <RichTextEditable { ...fieldProps['collaborate_header'] }/>
          </div>
          <EditToggle { ...editToggleProps }/>
        </div>
        <div style={ contentStyle } className='test--collaborate-section-content'>
          <RichTextEditable { ...fieldProps['collaborate_content'] } style={ {
            wrapper: style.paragraphWrapper,
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

CollaborateSection.childContextTypes = {
  draftEntityStyle: PropTypes.object
};

export default EditableSection(CollaborateSection);
