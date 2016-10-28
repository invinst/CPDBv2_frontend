import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import {
  leftBarStyle, rightBarStyle, wrapperStyle, infoRowStyle, labelStyle,
  headerTitleStyle, excerptStyle, contentWrapperStyle
} from './report.style';
import EditableSection from 'components/inline-editable/editable-section';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import MultilineTextEditable from 'components/inline-editable/editable-section/multiline-text-editable';
import ReportInfoRow from './report-info-row';
import DatePickerInput from './date-picker-input';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';


class Report extends Component {
  render() {
    let { className, fieldProps, editToggleProps } = this.props;
    className = classNames('story-full', className);

    return (
      <div className={ className } style={ wrapperStyle }>
        <BottomSheetHeader editToggleProps={ editToggleProps }/>
        <ResponsiveFixedWidthComponent style={ contentWrapperStyle }>
          <div style={ leftBarStyle }>
            <div style={ headerTitleStyle }>
              <PlainTextEditable { ...fieldProps['title'] } placeholder='Title'/>
            </div>
            <ReportInfoRow
              label='Publication'
              { ...fieldProps['publication'] }/>
            <div style={ infoRowStyle }>
              <span style={ labelStyle }>Publish Date</span>
              <DatePickerInput
                { ...fieldProps['publish_date'] }/>
            </div>
            <ReportInfoRow
              label='Author'
              { ...fieldProps['author'] }/>
          </div>
          <div style={ rightBarStyle }>
            <MultilineTextEditable
              style={ excerptStyle }
              placeholder='Excerpt'
              { ...fieldProps['excerpt'] }/>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

Report.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object,
  closeBottomSheet: PropTypes.func
};

export default EditableSection(Report);
