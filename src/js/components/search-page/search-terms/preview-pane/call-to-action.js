import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import { linkStyle, textStyle, buttonStyle } from './call-to-action.style';
import OutboundLink from 'components/common/outbound-link';
import { CALL_TO_ACTION_TYPES } from 'utils/constants';


export default class CallToAction extends Component {
  render() {
    const { item } = this.props;

    if (item.callToActionType === CALL_TO_ACTION_TYPES.VIEW_ALL) {
      return (
        <Link style={ linkStyle } to={ item.to } className='test--call-to-action'>
          <span style={ textStyle }>View ALL { pluralize.plural(item.name) }</span>
          <div style={ buttonStyle } className='test--enter-button'>enter</div>
        </Link>
      );
    }

    if (item.callToActionType === CALL_TO_ACTION_TYPES.LINK) {
      return (
        <OutboundLink style={ linkStyle } href={ item.url } className='test--call-to-action'>
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
