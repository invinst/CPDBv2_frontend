import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import OutboundLink from 'components/common/outbound-link';
import { containerStyle, buttonStyle, textStyle, linkStyle } from './view-widget.style';


export default class CallToActionWidget extends Component {
  render() {
    const { url, to, text } = this.props;

    const WrapperLink = ({ url, to, children }) => (
      to
        ? <Link style={ linkStyle } to={ to }>{ children }</Link>
        : <OutboundLink style={ linkStyle } href={ url }>{ children }</OutboundLink>
    );
    return (
      <WrapperLink url={ url } to={ to }>
        <div style={ containerStyle }>
          <span style={ textStyle }>{ text }</span>
          <div style={ buttonStyle }>→</div>
        </div>
      </WrapperLink>
    );
  }
}

CallToActionWidget.defaultProps = {
  url: null,
  to: null,
  text: 'View on the Data Tool'
};

CallToActionWidget.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string
};
