import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { STORIES_PATH } from 'utils/constants';
import {
  alignLeftStyle, alignRightStyle, coverageWrapperStyle, headerStyle, wrapperStyle, contentStyle
} from './reporting-section.style';
import ReportingPlaceHolder from 'components/landing-page/reporting-section/place-holder';
import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import MoreLink from 'components/common/more-link';


class ReportingSection extends Component {
  renderContent() {
    const { dataAvailable, stories } = this.props;

    return (
      !dataAvailable ?
        <ReportingPlaceHolder/> :
        <ReportingSectionContent
          stories={ stories }
          onStoryClick={ this.props.openBottomSheetWithStory }/>
    );
  }

  render() {
    return (
      <div style={ [wrapperStyle, coverageWrapperStyle] }>
        <div style={ headerStyle }>
          <div>
            <span style={ alignLeftStyle }>Recent Reports</span>
            <span style={ alignRightStyle }>
              <MoreLink to={ STORIES_PATH }>See more reporting</MoreLink>
            </span>
          </div>
        </div>
        <div style={ contentStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

ReportingSection.propTypes = {
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  stories: PropTypes.array
};

export default ConfiguredRadium(ReportingSection);
