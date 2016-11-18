import React, { Component, PropTypes } from 'react';

import {
  leftBarStyle, rightBarStyle, answerStyle, questionStyle, answerWrapperStyle, oneColumnStyle,
  contentWrapperStyle
} from './faq.style';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';
import ResponsiveComponent from 'components/responsive/responsive-component';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import EditableSection from 'components/inline-editable/editable-section';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import MultilineTextEditable from 'components/inline-editable/editable-section/multiline-text-editable';


class FAQ extends Component {
  renderTwoColumns(style) {
    const { fieldProps } = this.props;
    return (
      <div>
        <div style={ style.leftBar }>
          <div style={ style.question }>
            <PlainTextEditable
              placeholder='Question'
              { ...fieldProps['question'] }/>
          </div>
        </div>
        <div style={ style.rightBar }>
          <div style={ answerWrapperStyle }>
            <MultilineTextEditable
              style={ answerStyle }
              placeholder='Answer'
              { ...fieldProps['answer'] }/>
          </div>
        </div>
      </div>
    );
  }

  renderOneColumn() {
    const { fieldProps } = this.props;
    return (
      <div style={ oneColumnStyle }>
        <div style={ questionStyle[TABLET] }>
          <PlainTextEditable
            placeholder='Question'
            { ...fieldProps['question'] }/>
        </div>
        <div style={ answerWrapperStyle }>
          <MultilineTextEditable
            style={ answerStyle }
            placeholder='Answer'
            { ...fieldProps['answer'] }/>
        </div>
      </div>
    );
  }

  render() {
    const { editToggleProps } = this.props;
    return (
      <div>
        <BottomSheetHeader editToggleProps={ editToggleProps }/>
        <div style={ contentWrapperStyle() }>
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
  editToggleProps: PropTypes.object
};

export default EditableSection(FAQ);
