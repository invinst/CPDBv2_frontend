import React, { Component, PropTypes } from 'react';

import { FAQ_PATH } from 'utils/constants';
import FAQItem from 'components/common/faq/faq-item';
import FAQSectionPlaceHolder from 'components/landing-page/faq-section/faq-section-place-holder';
import {
  headerStyle, underlineFAQStyle, wrapperStyle, editBoxStyle,
  loadMoreStyle, loadMoreHoverStyle, contentStyle
} from './faq-section.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkButton from 'components/common/link-button';


export class FAQSection extends Component {
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
          <LinkButton
            link={ `/${FAQ_PATH}` }
            normalStyle={ loadMoreStyle }
            hoverStyle={ loadMoreHoverStyle }>More
          </LinkButton>
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

    return (
      <div style={ style.header }>
        <div style={ editBoxStyle }>
          <RichTextEditable { ...fieldProps['faq_header'] }/>
        </div>
        { editModeOn ?
          [
            <StrategyForm key='1' { ...fieldProps['faq_randomizer'] }/>,
            <EditToggle key='2' { ...editToggleProps }/>
          ] :
          null
        }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <div style={ contentStyle }>
          { this.renderHeader(style) }
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
  openBottomSheetWithFAQ: PropTypes.func,
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
