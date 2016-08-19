import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { FAQ_PATH } from 'utils/constants';
import { alignLeftStyle, alignRightStyle, headerStyle, contentStyle } from './faq-section.style';
import FAQContainer from 'containers/faq-container';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';
import MoreLink from 'components/common/more-link';


class FAQSection extends Component {
  render() {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ [template.header, headerStyle] }>
          <span style={ alignLeftStyle }>FAQ</span>
          <span style={ alignRightStyle }>
            <MoreLink to={ FAQ_PATH }>See more FAQ</MoreLink>
          </span>
        </div>
        <div style={ [template.content, contentStyle] }>
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
