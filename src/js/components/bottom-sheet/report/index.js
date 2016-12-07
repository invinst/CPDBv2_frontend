import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import {
  leftBarStyle, rightBarStyle, wrapperStyle, infoRowStyle, labelStyle, infoRowsStyle, extraPaddingStyle,
  headerTitleStyle, excerptStyle, contentWrapperStyle, oneColumnStyle, articleLinkWrapperStyle
} from './report.style';
import EditableSection from 'components/inline-editable/editable-section';
import StringInput from './string-input';
import DatePickerInput from './date-picker-input';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ResponsiveComponent from 'components/responsive/responsive-component';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


export class Report extends Component {
  constructor(props) {
    super(props);
    this.fetchReport();
  }

  fetchReport() {
    const { reportId, fields, fetchReport } = this.props;
    if (reportId && reportId !== 'new' && !fields) {
      fetchReport(reportId);
    }
  }

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
    const { fieldProps, sectionEditModeOn } = this.props;
    return (
      <div>
        <div style={ { ...style.leftBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <div style={ style.headerTitle }>
            <RichTextEditable { ...fieldProps['title'] } placeholder='Title'/>
          </div>
          { this.renderInfoRows(style) }
        </div>
        <div style={ { ...style.rightBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <RichTextEditable
            style={ excerptStyle }
            placeholder='Excerpt'
            { ...fieldProps['excerpt'] }/>
          <div style={ articleLinkWrapperStyle }>
            <RichTextEditable
              placeholder='link to article'
              { ...fieldProps['article_link'] }/>
          </div>
        </div>
      </div>
    );
  }

  renderOneColumn() {
    const { fieldProps, sectionEditModeOn } = this.props;
    return (
      <div style={ { ...oneColumnStyle, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
        <div style={ headerTitleStyle[TABLET] }>
          <RichTextEditable { ...fieldProps['title'] } placeholder='Title'/>
        </div>
        { this.renderInfoRows({ label: labelStyle[TABLET] }) }
        <RichTextEditable
          style={ excerptStyle }
          placeholder='Excerpt'
          { ...fieldProps['excerpt'] }/>
        <div style={ articleLinkWrapperStyle }>
          <RichTextEditable
            placeholder='link to article'
            { ...fieldProps['article_link'] }/>
        </div>
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
  sectionEditModeOn: PropTypes.bool,
  fields: PropTypes.object,
  fetchReport: PropTypes.func,
  reportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default EditableSection(Report);
