import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { linkStyle, textStyle, buttonStyle } from './call-to-action.style';
import OutboundLink from 'components/common/outbound-link';


export default class CallToAction extends Component {
  render() {
    const { item } = this.props;

    if (item['call_to_action_type'] === 'view_all') {
      return (
        <Link style={ linkStyle } to={ item.to } className='test--call-to-action'>
          <span style={ textStyle }>View ALL { item.name }</span>
          <div style={ buttonStyle } className='test--enter-button'>enter</div>
        </Link>
      );
    }

    if (item['call_to_action_type'] === 'link') {
      return (
        <OutboundLink style={ linkStyle } href={ item.link } className='test--call-to-action'>
          <span style={ textStyle }>Enter Data Tool</span>
          <div style={ buttonStyle } className='test--enter-button'>enter</div>
        </OutboundLink>
      );
    }

    return null;
  }
}

CallToAction.propTypes = {
  item: PropTypes.object
};
