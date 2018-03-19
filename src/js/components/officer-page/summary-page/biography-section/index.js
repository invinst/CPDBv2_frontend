import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import { biographySectionStyle, menuStyle, menuItemStyle } from './biography-section.style';
import Timeline from 'components/officer-page/summary-page/biography-section/timeline';


export default class BiographySection extends Component {

  constructor(props) {
    super(props);

    this.renderTimeline = this.renderTimeline.bind(this);

    this.biographyTabs = [
      { name: 'TIMELINE', renderer: this.renderTimeline },
      { name: 'SUMMARY', renderer: this.renderTimeline },
      { name: 'MAP', renderer: this.renderTimeline },
      { name: 'COACCUSALS', renderer: this.renderTimeline },
      { name: 'ATTACHMENTS', renderer: this.renderTimeline },
    ];
    this.activeTabName = 'TIMELINE';
  }

  renderMenu() {

    return (
      <div style={ menuStyle }>
        {
          this.biographyTabs.map((biographyTab, index) => (
            <span key={ index } style={ menuItemStyle(biographyTab.name === this.activeTabName) }>
              { biographyTab.name }
            </span>)
          )
        }
      </div>
    );
  }

  renderTimeline() {
    const { timelineItems } = this.props;
    return <Timeline items={ timelineItems }/>;
  }

  renderBiography() {
    const activeTab = find(this.biographyTabs, (tab) => tab.name === this.activeTabName );
    return activeTab.renderer();
  }

  render() {
    return (
      <div style={ biographySectionStyle }>
        { this.renderMenu() }
        { this.renderBiography() }
      </div>
    );
  }
}

BiographySection.propTypes = {
  timelineItems: PropTypes.array
};
