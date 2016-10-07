import React, { PropTypes, Component } from 'react';

import UnderlineText from 'components/common/underline-text';
import Hoverable from 'components/common/higher-order/hoverable';
import {
  wrapperStyle, iconStyle, iconHoverStyle
} from './most-recent-email-link.style';


class MostRecentEmailLink extends Component {

  render() {
    const { hovering, href, style } = this.props;
    return (
      <a style={ wrapperStyle } onClick={ this.visitLink } href={ href }>
        <i
          className='link--transition'
          style={ hovering ? iconHoverStyle : iconStyle }/>
        <UnderlineText
          style={ {
            base: { base: style, hover: style }
          } }
          hovering={ hovering }>
          Most Recent Email
        </UnderlineText>
      </a>
    );
  }
}

MostRecentEmailLink.propTypes = {
  hovering: PropTypes.bool,
  href: PropTypes.string,
  style: PropTypes.object
};

export default Hoverable(MostRecentEmailLink);
