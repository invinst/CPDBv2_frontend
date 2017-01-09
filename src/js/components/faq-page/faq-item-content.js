import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { contentStyle, editBlockStyle, faqContentStyle } from './faq-item-content.style';


class FAQItemContent extends Component {
  getChildContext() {
    return {
      draftEditorBlockStyle: editBlockStyle
    };
  }

  render() {
    const { style, fieldProps } = this.props;
    return (
      <div style={ [contentStyle, style] }>
        <div style={ faqContentStyle }>
          <RichTextEditable
            placeholder='Answer'
            { ...fieldProps['answer'] }/>
        </div>
      </div>
    );
  }
}

FAQItemContent.propTypes = {
  fieldProps: PropTypes.object,
  style: PropTypes.object
};

FAQItemContent.childContextTypes = {
  draftEditorBlockStyle: PropTypes.object
};

export default ConfiguredRadium(FAQItemContent);
