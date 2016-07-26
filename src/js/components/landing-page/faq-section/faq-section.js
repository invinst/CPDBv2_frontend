import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import Link from 'components/common/react-router-link';
import { FAQ_PATH } from 'utils/constants';
import { linkStyle, alignLeftStyle, alignRightStyle } from './faq-section.style';
import FAQContainer from 'containers/faq-container';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';


class FAQSection extends Component {
  render() {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ template.header }>
          <span style={ alignLeftStyle }>FAQ</span>
          <span style={ alignRightStyle }><Link to={ FAQ_PATH } style={ linkStyle }>+ More FAQ</Link></span>
        </div>
        <div style={ template.content }>
          <FAQContainer store={ this.props.store }/>
        </div>
      </div>
    );
  }
}

FAQSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  store: PropTypes.object
};

FAQSection.defaultProps = {
  template: SectionTemplate(BASE_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(FAQSection);
