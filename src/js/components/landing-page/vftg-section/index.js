import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import MostRecentEmailLink from './most-recent-email-link';
import {
  headerBlockStyle, headerStyle, newsWrapperStyle, vftgWrapperStyle,
  textStyleDesktop, textStyleExtraWide, wrapperStyle, editBoxStyle,
  textHoverStyle, vftgWrapperEditModeStyle, editWrapperLinkStyle, linkStyle
} from './vftg-section.style';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import SubscribeForm from 'containers/landing-page/vftg-section/subscribe-form-container';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkPicker from 'components/inline-editable/link-picker';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import DatePicker from 'components/inline-editable/date-picker';


export class VFTGSection extends Component {
  constructor(props) {
    super(props);
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        textStyle: textStyleExtraWide,
        link: { ...linkStyle.base, ...linkStyle.extraWide },
        header: { ...headerStyle.base, ...headerStyle.extraWide }
      },
      [DESKTOP]: {
        textStyle: textStyleDesktop,
        link: { ...linkStyle.base, ...linkStyle.desktop },
        header: { ...headerStyle.base, ...headerStyle.desktop }
      },
      [TABLET]: {
        textStyle: textStyleDesktop,
        link: { ...linkStyle.base, ...linkStyle.tablet },
        header: { ...headerStyle.base, ...headerStyle.tablet }
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { fieldProps, editToggleProps, sectionEditModeOn } = this.props;
    const link = fieldProps['vftg_link'] ? fieldProps['vftg_link'].value : null;

    return (
      <div style={ wrapperStyle }>
        <div style={ sectionEditModeOn ? vftgWrapperEditModeStyle : vftgWrapperStyle }>
          <div style={ newsWrapperStyle }>
            <div style={ headerBlockStyle }>
              <div style={ editBoxStyle }>
                <span style={ style.header }>CPDP WEEKLY</span>
                <DatePicker { ...fieldProps['vftg_date'] }/>
              </div>
              <EditToggle { ...editToggleProps } style={ editWrapperLinkStyle }/>
            </div>
            <div style={ style.textStyle }>
              <RichTextEditable { ...fieldProps['vftg_content'] }
                presenterElement={
                  <a className='link--transition' style={ textHoverStyle }
                    href={ link } key={ style.screen }/>
                }/>
            </div>
          </div>
          <div>
            <MostRecentEmailLink href={ link } style={ style.link }/>
            <LinkPicker { ...fieldProps['vftg_link'] }/>
          </div>
          <SubscribeForm disabled={ sectionEditModeOn }/>
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

VFTGSection.propTypes = {
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object,
  sectionEditModeOn: PropTypes.bool,
  contentLink: PropTypes.string
};

export default EditableSection(ConfiguredRadium(VFTGSection));
