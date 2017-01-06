import React, { Component, PropTypes } from 'react';

import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { EXTRA_WIDE, TABLET, DESKTOP, ENTITY_LINK } from 'utils/constants';
import {
  textWrapperStyle, heroTitleStyle, heroComplaintTextStyle, heroUseOfForceStyle,
  responsiveStyleWrapperStyle, entityLinkStyle
} from './text-column.style';


export class TextColumn extends Component {

  getChildContext() {
    return {
      draftEntityStyle: {
        [ENTITY_LINK]: entityLinkStyle
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { fieldProps } = this.props;

    return (
      <div style={ style.wrapper }>
        <div style={ style.title }>
          <RichTextEditable
            { ...fieldProps['hero_title'] }/>
        </div>
        <div style={ style.complaints }>
          <RichTextEditable
            { ...fieldProps['hero_complaint_text'] }/>
        </div>
        <div style={ style.useOfForce }>
          <RichTextEditable
            { ...fieldProps['hero_use_of_force_text'] }/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        style={ responsiveStyleWrapperStyle }
        responsiveStyle={ {
          [TABLET]: {
            wrapper: textWrapperStyle.tablet,
            title: heroTitleStyle.tablet,
            complaints: heroComplaintTextStyle.tablet,
            useOfForce: heroUseOfForceStyle.tablet
          },
          [DESKTOP]: {
            wrapper: textWrapperStyle.desktop,
            title: heroTitleStyle.desktop,
            complaints: heroComplaintTextStyle.desktop,
            useOfForce: heroUseOfForceStyle.desktop
          },
          [EXTRA_WIDE]: {
            wrapper: textWrapperStyle.extraWide,
            title: heroTitleStyle.extraWide,
            complaints: heroComplaintTextStyle.extraWide,
            useOfForce: heroUseOfForceStyle.extraWide
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

TextColumn.propTypes = {
  fieldProps: PropTypes.object
};

TextColumn.defaultProps = {
  fieldProps: {}
};

TextColumn.childContextTypes = {
  draftEntityStyle: PropTypes.object
};

export default TextColumn;
