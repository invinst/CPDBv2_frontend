import React from 'react';

import Section from 'components/common/section';
import AboutSectionContent from './about-section-content';


export default class AboutSection extends Section {
  renderHeader() {
    return (
      <div>About</div>
    );
  }

  renderContent() {
    return <AboutSectionContent/>;
  }
}
