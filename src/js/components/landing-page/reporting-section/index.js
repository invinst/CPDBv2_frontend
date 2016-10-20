import React, { Component, PropTypes } from 'react';

import { STORIES_PATH } from 'utils/constants';
import {
  alignRightStyle, coverageWrapperStyle, headerStyle,
  wrapperStyle, contentStyle, editBoxStyle
} from './reporting-section.style';
import ReportingPlaceHolder from 'components/landing-page/reporting-section/place-holder';
import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import MoreLink from 'components/common/more-link';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import EditableSection from 'components/inline-editable/editable-section';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';


class ReportingSection extends Component {
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
    const { dataAvailable, stories } = this.props;

    return (
      !dataAvailable ?
        <ReportingPlaceHolder/> :
        <ReportingSectionContent
          stories={ stories }
          onStoryClick={ this.props.openBottomSheetWithReport }/>
    );
  }

  renderHeader(style) {
    const { editToggleProps, fieldProps } = this.props;
    const { editModeOn } = this.context;

    return (
      <div style={ style.header }>
        <div style={ editBoxStyle }>
          <PlainTextEditable { ...fieldProps['reporting_header'] }/>
        </div>
        {
          editModeOn ?
            <span style={ alignRightStyle }>
              <StrategyForm { ...fieldProps['reporting_randomizer'] }/>
              <EditToggle { ...editToggleProps }/>
            </span> :
            <span style={ alignRightStyle }>
              <MoreLink to={ STORIES_PATH }>See more reporting</MoreLink>
            </span>
        }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ { ...wrapperStyle, ...coverageWrapperStyle } }>
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
  stories: PropTypes.array,
  fieldProps: PropTypes.object,
  editToggleProps: PropTypes.object
};

ReportingSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default EditableSection(ReportingSection);
