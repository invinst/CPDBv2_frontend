import React from 'react';

import Section from 'components/common/section';
import CollaborateSectionContent from './collaborate-section-content';


export default class CollaborateSection extends Section {
  renderHeader() {
    return (
      <span>Collaborate with us</span>
    );
  }

  renderContent() {
    return <CollaborateSectionContent/>;
  }
}
