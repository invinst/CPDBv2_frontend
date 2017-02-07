import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import Hoverable from 'components/common/higher-order/hoverable';
import { titleStyle, checkboxStyle, titleReducedWidth } from './faq-item.style';


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

  wrapperStyle() {
    const style = this.props.style.wrapper || {};
    return {
      ...style.base,
      ...(this.props.hovering ? style.hover : {})
    };
  }

  titleStyle(responsiveStyle) {
    const style = this.props.style.title || {};
    return {
      ...responsiveStyle.title,
      ...(this.props.showStar ? titleReducedWidth : {}),
      ...style.base,
      ...(this.props.hovering ? style.hover : {})
    };
  }

  renderWithResponsiveStyle(style) {
    const { faqId, onClick, fieldProps, showStar } = this.props;
    const { starred } = this.state;

    return (
      <div key={ style.screen } style={ this.wrapperStyle() } className='test--faq-item'>
        <div
          className='faq-title link--transition'
          style={ this.titleStyle(style) }
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
            title: { ...titleStyle.base, ...titleStyle.extraWide }
          },
          [DESKTOP]: {
            title: titleStyle.base
          },
          [TABLET]: {
            title: { ...titleStyle.base, ...titleStyle.tablet }
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
  hovering: PropTypes.bool,
  style: PropTypes.object,
  onStarredToggle: PropTypes.func,
  showStar: PropTypes.bool,
  starred: PropTypes.bool
};

FAQItem.defaultProps = {
  style: {},
  onClick: () => {}
};

export default Hoverable(FAQItem);
