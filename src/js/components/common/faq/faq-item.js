import React, { Component, PropTypes } from 'react';
import { assign } from 'lodash';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import ConfiguredRadium from 'utils/configured-radium';
import { faqItemStyle } from './faq-item.style';


class FAQItem extends Component {

  constructor() {
    super();

    this.onHover = this.onHover.bind(this);
  }

  // FIXME: We handle onMouseEnter and onMouseLeave manually to work around the library's issue:
  // https://github.com/FormidableLabs/radium/issues/524
  onHover(isHover) {
    const { _radiumStyleState } = this.state;
    const newRadiumState = assign({}, _radiumStyleState);

    if (Object.keys(_radiumStyleState).length > 0) {
      newRadiumState[Object.keys(_radiumStyleState)[0]][':hover'] = isHover;
      this.setState({ '_radiumStyleState': newRadiumState });
    }
  }

  renderWithResponsiveStyle(style) {
    const { faqId, onClick, wrapperStyle, fieldProps } = this.props;

    return (
      <div
        key={ style.screen }
        className='faq-title link--transition test--faq-item'
        style={ [style.faqItem, wrapperStyle] }
        onClick={ () => { onClick(faqId); } }
        onMouseEnter={ () => { this.onHover(true); } }
        onMouseLeave={ () => { this.onHover(false); } }>
        <RichTextEditable
          placeholder='Question'
          { ...fieldProps['question'] }/>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [EXTRA_WIDE]: {
            faqItem: [faqItemStyle.base, faqItemStyle.extraWide]
          },
          [DESKTOP]: {
            faqItem: faqItemStyle.base
          },
          [TABLET]: {
            faqItem: [faqItemStyle.base, faqItemStyle.tablet]
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

FAQItem.propTypes = {
  faqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fieldProps: PropTypes.object,
  onClick: PropTypes.func,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FAQItem.defaultProps = {
  wrapperStyle: {}
};

export default ConfiguredRadium(FAQItem);
