import React, { Component } from 'react';
import { get, keys } from 'lodash';

import { menuItemStyle, menuStyle, tabbedPaneSectionStyle } from './tabbed-pane-section.style';
import TimelineContainer from 'containers/officer-page/timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import AttachmentsContainer from 'containers/officer-page/attachments-container';


export default class TabbedPaneSection extends Component {
  constructor(props) {
    super(props);
    this.tabbedPaneMap = {
      'TIMELINE': <TimelineContainer/>,
      'MAP': null,
      'COACCUSALS': <CoaccusalsContainer/>,
      'ATTACHMENTS': <AttachmentsContainer/>,
    };
    this.state = {
      activeTabName: 'TIMELINE'
    };
  }

  render() {
    return (
      <div style={ tabbedPaneSectionStyle }>
        <div style={ menuStyle } className='test--tabbed-pane-section-menu'>
          {
            keys(this.tabbedPaneMap).map((paneName) => (
              <span
                key={ paneName }
                style={ menuItemStyle(paneName === this.state.activeTabName) }
                className='test--tabbed-pane-tab-name'
                onClick={ () => this.setState({ activeTabName: paneName }) }
              >
                { paneName }
              </span>)
            )
          }
        </div>
        { get(this.tabbedPaneMap, this.state.activeTabName, null) }
      </div>
    );
  }
}
