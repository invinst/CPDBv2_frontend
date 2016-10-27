import React, { Component, PropTypes } from 'react';

import { FAQ_PATH } from 'utils/constants';
import FAQItem from 'components/common/faq/faq-item';
import MoreLink from 'components/common/more-link';
import FAQSectionPlaceHolder from 'components/landing-page/faq-section/faq-section-place-holder';
import {
  alignLeftStyle, alignRightStyle, headerStyle, contentStyle,
  underlineFAQStyle, wrapperStyle, editBoxStyle
} from './faq-section.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';


class FAQSection extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        header: { ...headerStyle.base, ...headerStyle.extraWide }
      },
      [DESKTOP]: {
        header: { ...headerStyle.base, ...headerStyle.desktop }
      },
      [TABLET]: {
        header: { ...headerStyle.base, ...headerStyle.tablet }
      }
    };
  }

  renderContent() {
    const { dataAvailable, faqs, openBottomSheetWithFAQ, sectionEditModeOn } = this.props;

    if (dataAvailable && !sectionEditModeOn) {
      return (
        <div>
        { faqs.map((faq, ind) => {
          return (
            <FAQItem
              key={ ind }
              faq={ faq }
              onClick={ openBottomSheetWithFAQ }
              wrapperStyle={ [ind < faqs.length - 1 && underlineFAQStyle] }/>
          );
        }) }
        </div>
      );
    } else {
      return (
        <FAQSectionPlaceHolder/>
      );
    }
  }

  renderHeader(style) {
    const { editToggleProps, fieldProps } = this.props;
    const { editModeOn } = this.context;

    if (!editModeOn) {
      return (
        <div style={ style.header }>
          <span style={ alignLeftStyle }>FAQ</span>
          <span style={ alignRightStyle }>
            <MoreLink to={ FAQ_PATH }>See more FAQ</MoreLink>
          </span>
        </div>
      );
    }

    return (
      <div style={ style.header }>
        <div style={ editBoxStyle }>
          <PlainTextEditable { ...fieldProps['faq_header'] }/>
        </div>
        <StrategyForm { ...fieldProps['faq_randomizer'] }/>
        <EditToggle { ...editToggleProps }/>
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        { this.renderHeader(style) }
        <div style={ contentStyle }>
            { this.renderContent() }
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

FAQSection.propTypes = {
  openBottomSheetWithFAQ: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  faqs: PropTypes.array,
  sectionEditModeOn: PropTypes.bool,
  editToggleProps: PropTypes.object,
  fieldProps: PropTypes.object
};

FAQSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default EditableSection(FAQSection);
