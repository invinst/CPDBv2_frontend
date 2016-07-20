import React from 'react';

import Section from 'components/common/section';
import TwitterSectionContent from './twitter-section-content';
import { wrapperStyle } from './twitter-section.style';


export default class TwitterSection extends Section {
  constructor(props) {
    super(props);
    this.state = { noHeader: true, wrapperStyle: wrapperStyle };
  }

  renderContent() {
    return <TwitterSectionContent/>;
  }
}
