import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { STORIES_PATH } from 'utils/constants';
import {
  alignLeftStyle, alignRightStyle, coverageWrapperStyle, headerStyle
} from './coverage-section.style';
import StoriesContainer from 'containers/stories-container';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';
import MoreLink from 'components/common/more-link';


class CoverageSection extends Component {
  render() {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle, coverageWrapperStyle] }>
        <div style={ [template.header, headerStyle] }>
          <div>
            <span style={ alignLeftStyle }>Recent Coverage</span>
            <span style={ alignRightStyle }>
              <MoreLink to={ STORIES_PATH }>See more reporting</MoreLink>
            </span>
          </div>
        </div>
        <div style={ template.content }>
          <StoriesContainer store={ this.props.store }/>
        </div>
      </div>
    );
  }
}

CoverageSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  store: PropTypes.object
};

CoverageSection.defaultProps = {
  template: SectionTemplate(BASE_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(CoverageSection);
