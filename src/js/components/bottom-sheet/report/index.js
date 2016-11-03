import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import {
  leftBarStyle, rightBarStyle, wrapperStyle, infoRowStyle, labelStyle, infoRowsStyle,
  headerTitleStyle, excerptStyle, contentWrapperStyle, oneColumnStyle
} from './report.style';
import EditableSection from 'components/inline-editable/editable-section';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import MultilineTextEditable from 'components/inline-editable/editable-section/multiline-text-editable';
import StringInput from './string-input';
import DatePickerInput from './date-picker-input';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ResponsiveComponent from 'components/responsive/responsive-component';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';


class Report extends Component {
  renderInfoRows(style) {
    const { fieldProps } = this.props;
    return (
      <div style={ infoRowsStyle }>
        <div style={ infoRowStyle }>
          <span style={ style.label }>Publication</span>
          <StringInput
            { ...fieldProps['publication'] }/>
        </div>
        <div style={ infoRowStyle }>
          <span style={ style.label }>Publish Date</span>
          <DatePickerInput
            { ...fieldProps['publish_date'] }/>
        </div>
        <div style={ infoRowStyle }>
          <span style={ style.label }>Author</span>
          <StringInput
            { ...fieldProps['author'] }/>
        </div>
      </div>
    );
  }

  renderTwoColumns(style) {
    const { fieldProps } = this.props;
    return (
      <div>
        <div style={ style.leftBar }>
          <div style={ style.headerTitle }>
            <PlainTextEditable { ...fieldProps['title'] } placeholder='Title'/>
          </div>
          { this.renderInfoRows(style) }
        </div>
        <div style={ style.rightBar }>
          <MultilineTextEditable
            style={ excerptStyle }
            placeholder='Excerpt'
            { ...fieldProps['excerpt'] }/>
        </div>
      </div>
    );
  }

  renderOneColumn() {
    const { fieldProps } = this.props;
    return (
      <div style={ oneColumnStyle }>
        <div style={ headerTitleStyle[TABLET] }>
          <PlainTextEditable { ...fieldProps['title'] } placeholder='Title'/>
        </div>
        { this.renderInfoRows({ label: labelStyle[TABLET] }) }
        <MultilineTextEditable
          style={ excerptStyle }
          placeholder='Excerpt'
          { ...fieldProps['excerpt'] }/>
      </div>
    );
  }

  render() {
    let { className, editToggleProps } = this.props;
    className = classNames('report-bottom-sheet', className);

    return (
      <div className={ className } style={ wrapperStyle() }>
        <BottomSheetHeader editToggleProps={ editToggleProps }/>
        <div style={ contentWrapperStyle() }>
          <ResponsiveFixedWidthComponent>
            <ResponsiveComponent
              extraWideChildren={ this.renderTwoColumns({
                leftBar: leftBarStyle[EXTRA_WIDE](),
                rightBar: rightBarStyle[EXTRA_WIDE](),
                label: labelStyle[EXTRA_WIDE],
                headerTitle: headerTitleStyle[EXTRA_WIDE]
              }) }
              desktopChildren={ this.renderTwoColumns({
                leftBar: leftBarStyle[DESKTOP](),
                rightBar: rightBarStyle[DESKTOP](),
                label: labelStyle[DESKTOP],
                headerTitle: headerTitleStyle[DESKTOP]
              }) }
              tabletChildren={ this.renderOneColumn() }/>
          </ResponsiveFixedWidthComponent>
        </div>
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
