import React, { Component, PropTypes } from 'react';

import {
  leftBarStyle, rightBarStyle, answerStyle, questionStyle, answerWrapperStyle,
  oneColumnStyle, extraPaddingStyle, headerStyle
} from './faq.style';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';
import ResponsiveComponent from 'components/responsive/responsive-component';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import EditableSection from 'components/inline-editable/editable-section';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import StickyHeader from 'components/common/sticky-header';


class FAQ extends Component {
  componentWillMount() {
    this.fetchFAQ();
  }

  fetchFAQ() {
    const { faqId, fields, fetchFAQ } = this.props;
    if (faqId && faqId !== 'new' && !fields) {
      fetchFAQ(faqId);
    }
  }

  renderTwoColumns(style) {
    const { fieldProps, sectionEditModeOn } = this.props;
    return (
      <div>
        <div style={ { ...style.leftBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <div style={ style.question }>
            <RichTextEditable
              placeholder='Question'
              className='test--faq-rich-text-question'
              { ...fieldProps['question'] }/>
          </div>
        </div>
        <div style={ { ...style.rightBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <div style={ answerWrapperStyle }>
            <RichTextEditable
              style={ answerStyle }
              placeholder='Answer'
              className='test--faq-rich-text-answer'
              { ...fieldProps['answer'] }/>
          </div>
        </div>
      </div>
    );
  }

  renderOneColumn() {
    const { fieldProps, sectionEditModeOn } = this.props;
    return (
      <div style={ { ...oneColumnStyle, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
        <div style={ questionStyle[TABLET] }>
          <RichTextEditable
            placeholder='Question'
            { ...fieldProps['question'] }/>
        </div>
        <div style={ answerWrapperStyle }>
          <RichTextEditable
            style={ answerStyle }
            placeholder='Answer'
            { ...fieldProps['answer'] }/>
        </div>
      </div>
    );
  }

  render() {
    const { editToggleProps, sectionEditModeOn } = this.props;
    return (
      <div className='faq-bottom-sheet'>
        <StickyHeader style={ headerStyle(sectionEditModeOn) }>
          <BottomSheetHeader editToggleProps={ editToggleProps }/>
        </StickyHeader>
        <div>
          <ResponsiveFixedWidthComponent>
            <ResponsiveComponent
              extraWideChildren={ this.renderTwoColumns({
                leftBar: leftBarStyle[EXTRA_WIDE](),
                rightBar: rightBarStyle[EXTRA_WIDE](),
                question: questionStyle[EXTRA_WIDE]
              }) }
              desktopChildren={ this.renderTwoColumns({
                leftBar: leftBarStyle[DESKTOP](),
                rightBar: rightBarStyle[DESKTOP](),
                question: questionStyle[DESKTOP]
              }) }
              tabletChildren={ this.renderOneColumn() }/>
          </ResponsiveFixedWidthComponent>
        </div>
      </div>
    );
  }
}

FAQ.propTypes = {
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object,
  faqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fields: PropTypes.object,
  fetchFAQ: PropTypes.func,
  sectionEditModeOn: PropTypes.bool
};

export default EditableSection(FAQ);
