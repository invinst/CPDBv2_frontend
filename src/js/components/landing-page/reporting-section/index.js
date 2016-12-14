import React, { Component, PropTypes } from 'react';

import {
  alignRightStyle, headerStyle, wrapperStyle, contentStyle, editBoxStyle
} from './reporting-section.style';
import ReportingPlaceHolder from 'components/landing-page/reporting-section/place-holder';
import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


class ReportingSection extends Component {
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
    const { dataAvailable, reportGroups, sectionEditModeOn } = this.props;

    return (
      !dataAvailable || sectionEditModeOn ?
        <ReportingPlaceHolder/> :
        <ReportingSectionContent
          reportGroups={ reportGroups }
          onReportClick={ this.props.openBottomSheetWithReport }/>
    );
  }

  renderHeader(style) {
    const { editToggleProps, fieldProps } = this.props;
    const { editModeOn } = this.context;

    return (
      <div style={ style.header }>
        <div style={ editBoxStyle }>
          <RichTextEditable { ...fieldProps['reporting_header'] }/>
        </div>
        {
          editModeOn ?
            <span style={ alignRightStyle }>
              <StrategyForm { ...fieldProps['reporting_randomizer'] }/>
              <EditToggle { ...editToggleProps }/>
            </span> :
            null
        }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ style.wrapper }>
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

ReportingSection.propTypes = {
  openBottomSheetWithReport: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  reportGroups: PropTypes.array,
  fieldProps: PropTypes.object,
  sectionEditModeOn: PropTypes.bool,
  editToggleProps: PropTypes.object
};

ReportingSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default EditableSection(ReportingSection);
