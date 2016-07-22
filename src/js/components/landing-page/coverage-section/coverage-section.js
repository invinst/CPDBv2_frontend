import React, { PropTypes } from 'react';
import { assign } from 'lodash';

import Section from 'components/common/section';
import Link from 'components/common/react-router-link';
import { STORIES_PATH } from 'utils/constants';
import { linkStyle, alignLeftStyle, alignRightStyle, contentWrapperStyle } from './coverage-section.style';
import StoriesContainer from 'containers/stories-container';


export default class CoverageSection extends Section {
  renderHeader() {
    // TODO: create common component
    return (
      <div>
        <span style={ alignLeftStyle }>Recent Coverage</span>
        <span style={ alignRightStyle }><Link to={ STORIES_PATH } style={ linkStyle }>+ More Coverage</Link></span>
      </div>
    );
  }

  renderContent() {
    return (
      <div style={ contentWrapperStyle }>
        <StoriesContainer store={ this.props.store }/>
      </div>
    );
  }
}

CoverageSection.propTypes = assign({}, Section.propTypes, { store: PropTypes.object });
