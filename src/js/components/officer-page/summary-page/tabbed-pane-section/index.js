import React, { Component, PropTypes } from 'react';
import { keys, get } from 'lodash';

import { tabbedPaneSectionStyle, menuItemStyle, menuStyle } from './tabbed-pane-section.style';
import TimelineContainer from 'containers/officer-page/timeline-container';


export default class TabbedPaneSection extends Component {

  constructor(props) {
    super(props);

    this.tabbedPaneMap = {
      'TIMELINE': <TimelineContainer/>,
      'SUMMARY': null,
      'MAP': null,
      'COACCUSALS': null,
      'ATTACHMENTS': null,
    };
    this.activeTabName = 'TIMELINE';
  }

  renderMenu() {
    return (
      <div style={ menuStyle } className='test--tabbed-pane-section-menu'>
        {
          keys(this.tabbedPaneMap).map((paneName, index) => (
            <span
              key={ index }
              style={ menuItemStyle(paneName === this.activeTabName) }
              className='test--tabbed-pane-tab-name'
            >
              { paneName }
            </span>)
          )
        }
      </div>
    );
  }

  render() {
    return (
      <div style={ tabbedPaneSectionStyle }>
        { this.renderMenu() }
        { get(this.tabbedPaneMap, this.activeTabName, null) }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  timelineItems: PropTypes.array,
  changeFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
};

TabbedPaneSection.defaultProps = {
  timelineItems: []
};

