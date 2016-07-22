import React, { PropTypes } from 'react';
import { assign } from 'lodash';

import Section from 'components/common/section';
import Link from 'components/common/react-router-link';
import { FAQ_PATH } from 'utils/constants';
import { linkStyle, alignLeftStyle, alignRightStyle } from './faq-section.style';
import FAQContainer from 'containers/faq-container';


export default class FAQSection extends Section {
  renderHeader() {
    return (
      <div>
        <span style={ alignLeftStyle }>FAQ</span>
        <span style={ alignRightStyle }><Link to={ FAQ_PATH } style={ linkStyle }>+ More FAQ</Link></span>
      </div>
    );
  }

  renderContent() {
    return <FAQContainer store={ this.props.store }/>;
  }
}

FAQSection.propTypes = assign({}, Section.propTypes, { store: PropTypes.object });
