import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';

import {
  leftBarStyle, rightBarStyle, infoRowStyle, labelStyle, infoRowsStyle, extraPaddingStyle,
  headerTitleStyle, excerptStyle, oneColumnStyle, articleLinkWrapperStyle, headerStyle
} from './report.style';
import EditableSection from 'components/inline-editable/editable-section';
import StringInput from './string-input';
import DatePickerInput from './date-picker-input';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ResponsiveComponent from 'components/responsive/responsive-component';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import OfficerSection from './officer-section';
import StickyHeader from 'components/common/sticky-header';


export class Report extends Component {
  componentWillMount() {
    this.fetchReport();
  }

  fetchReport() {
    const { reportId, fields, fetchReport } = this.props;
    if (reportId && reportId !== 'new' && !fields) {
      fetchReport(reportId);
    }
  }

  renderInfoRows(style) {
    const { fieldProps, searchOfficers, officerSearchResult, openBottomSheetWithOfficer } = this.props;
    const fields = [
      { label: 'Publication', element: <StringInput { ...fieldProps['publication'] }/> },
      { label: 'Publish Date', element: <DatePickerInput { ...fieldProps['publish_date'] }/> },
      { label: 'Author', element: <StringInput { ...fieldProps['author'] }/> }
    ];

    return (
      <div>
        <div style={ infoRowsStyle }>
          { map(fields, ({ label, element }, ind) => (
            <div key={ ind } style={ infoRowStyle }>
              <span style={ style.label }>{ label }</span>
              { element }
            </div>
          )) }
        </div>
        <OfficerSection
          { ...fieldProps['officers'] }
          officerSearchResult={ officerSearchResult }
          openBottomSheetWithOfficer={ openBottomSheetWithOfficer }
          searchOfficers={ searchOfficers }/>
      </div>
    );
  }

  renderTwoColumns(style) {
    const { fieldProps, sectionEditModeOn } = this.props;
    return (
      <div>
        <div style={ { ...style.leftBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <div style={ style.headerTitle }>
            <RichTextEditable { ...fieldProps['title'] } placeholder='Title' className='test--rich-text-title'/>
          </div>
          { this.renderInfoRows(style) }
        </div>
        <div style={ { ...style.rightBar, ...(sectionEditModeOn ? extraPaddingStyle : {}) } }>
          <RichTextEditable
            style={ excerptStyle }
            placeholder='Excerpt'
            className='test--rich-text-excerpt'
            { ...fieldProps['excerpt'] }/>
          <div style={ articleLinkWrapperStyle }>
            <RichTextEditable
              placeholder='link to article'
              className='test--rich-text-article-link'
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
    let { className, editToggleProps, sectionEditModeOn } = this.props;
    className = classNames('report-bottom-sheet', className);

    return (
      <div className={ className }>
        <StickyHeader style={ headerStyle(sectionEditModeOn) }>
          <BottomSheetHeader editToggleProps={ editToggleProps }/>
        </StickyHeader>
        <div>
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
  reportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchOfficers: PropTypes.func,
  openBottomSheetWithOfficer: PropTypes.func,
  officerSearchResult: PropTypes.array
};

export default EditableSection(Report);
