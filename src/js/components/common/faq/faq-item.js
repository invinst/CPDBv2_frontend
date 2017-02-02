import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import ConfiguredRadium from 'utils/configured-radium';
import { faqItemStyle, faqItemTitleStyle, checkboxStyle, titleReducedWidth } from './faq-item.style';


class FAQItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      starred: props.starred
    };
  }

  handleChange() {
    const { onStarredToggle } = this.props;
    const { starred } = this.state;

    this.setState({
      starred: !starred
    });

    onStarredToggle(!starred);
  }

  renderWithResponsiveStyle(style) {
    const { faqId, onClick, wrapperStyle, fieldProps, showStar } = this.props;
    const { starred } = this.state;

    return (
      <div key={ style.screen } style={ { ...faqItemStyle, ...wrapperStyle } } className='test--faq-item'>
        <div
          className='faq-title link--transition'
          style={ { ...style.faqItemTitle, ...(showStar ? titleReducedWidth : {}) } }
          onClick={ () => { onClick(faqId); } }>
          <RichTextEditable
            placeholder='Question'
            { ...fieldProps['question'] }/>
        </div>
        {
          showStar ?
            <div style={ checkboxStyle }>
              <input type='checkbox' onChange={ this.handleChange } checked={ starred }/>
            </div>
            : null
        }
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [EXTRA_WIDE]: {
            faqItemTitle: { ...faqItemTitleStyle.base, ...faqItemTitleStyle.extraWide }
          },
          [DESKTOP]: {
            faqItemTitle: faqItemTitleStyle.base
          },
          [TABLET]: {
            faqItemTitle: { ...faqItemTitleStyle.base, ...faqItemTitleStyle.tablet }
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
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onStarredToggle: PropTypes.func,
  showStar: PropTypes.bool,
  starred: PropTypes.bool
};

FAQItem.defaultProps = {
  wrapperStyle: {},
  onClick: () => {}
};

export default ConfiguredRadium(FAQItem);
