import React, { Component, PropTypes } from 'react';

import {
  leftBarStyle, rightBarStyle, answerStyle, questionStyle, answerWrapperStyle
} from './faq.style';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import EditableSection from 'components/inline-editable/editable-section';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import MultilineTextEditable from 'components/inline-editable/editable-section/multiline-text-editable';


class FAQ extends Component {
  render() {
    const { fieldProps, editToggleProps } = this.props;

    return (
      <div>
        <BottomSheetHeader editToggleProps={ editToggleProps }/>
        <ResponsiveFixedWidthComponent>
          <div style={ leftBarStyle }>
            <div style={ questionStyle }>
              <PlainTextEditable
                placeholder='Question'
                { ...fieldProps['question'] }/>
            </div>
          </div>
          <div style={ rightBarStyle }>
            <div style={ answerWrapperStyle }>
              <MultilineTextEditable
                style={ answerStyle }
                placeholder='Answer'
                { ...fieldProps['answer'] }/>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

FAQ.propTypes = {
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object
};

export default EditableSection(FAQ);
