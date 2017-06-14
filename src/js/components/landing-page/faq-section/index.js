import React, { Component, PropTypes } from 'react';

import { FAQ_PATH } from 'utils/constants';
import FAQItem from 'components/common/faq/faq-item';
import FAQSectionPlaceHolder from 'components/landing-page/faq-section/faq-section-place-holder';
import {
  headerStyle, faqStyle, wrapperStyle, editBoxStyle,
  lastFaqStyle, loadMoreStyle, loadMoreHoverStyle, contentStyle
} from './faq-section.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableLink from 'components/common/hoverable-link';


export class FAQSection extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        header: { ...headerStyle.base, ...headerStyle.extraWide },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.extraWide }
      },
      [DESKTOP]: {
        header: { ...headerStyle.base, ...headerStyle.desktop },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.desktop }
      },
      [TABLET]: {
        header: { ...headerStyle.base, ...headerStyle.tablet },
        wrapper: { ...wrapperStyle.base, ...wrapperStyle.tablet }
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
                key={ faq.id }
                faqId={ faq.id }
                fieldProps={ faq.fieldProps }
                onClick={ openBottomSheetWithFAQ }
                style={ {
                  wrapper: ind < faqs.length - 1 ? lastFaqStyle : faqStyle
                } }/>
            );
          }) }
          <HoverableLink
            to={ `/${FAQ_PATH}` }
            style={ {
              base: loadMoreStyle,
              hover: loadMoreHoverStyle
            } }>
            More
          </HoverableLink>
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
      <div style={ style.header } className='test--faq-section-header'>
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
      <div style={ style.wrapper } className='test--faq-section'>
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
