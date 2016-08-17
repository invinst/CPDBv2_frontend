import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import Link from 'components/common/react-router-link';
import { STORIES_PATH } from 'utils/constants';
import { linkStyle, alignLeftStyle, alignRightStyle } from './coverage-section.style';
import StoriesContainer from 'containers/stories-container';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';


class CoverageSection extends Component {
  render() {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ template.header }>
          <div>
            <span style={ alignLeftStyle }>Recent Coverage</span>
            <span style={ alignRightStyle }><Link to={ STORIES_PATH } style={ linkStyle }>+ More Coverage</Link></span>
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
