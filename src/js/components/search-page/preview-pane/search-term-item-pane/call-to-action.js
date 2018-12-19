import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import { linkStyle, textStyle, buttonStyle } from './call-to-action.style';
import OutboundLink from 'components/common/outbound-link';
import { CALL_TO_ACTION_TYPES } from 'utils/constants';


export default class CallToAction extends Component {
  render() {
    const { name, url, to, callToActionType } = this.props;

    if (callToActionType === CALL_TO_ACTION_TYPES.VIEW_ALL) {
      return (
        <Link style={ linkStyle } to={ to } className='test--call-to-action'>
          <span style={ textStyle }>View ALL { pluralize.plural(name) }</span>
          <div style={ buttonStyle } className='test--enter-button'>enter</div>
        </Link>
      );
    }

    if (callToActionType === CALL_TO_ACTION_TYPES.LINK) {
      return (
        <OutboundLink style={ linkStyle } href={ url } className='test--call-to-action'>
          <span style={ textStyle }>Enter Data Tool</span>
          <div style={ buttonStyle } className='test--enter-button'>enter</div>
        </OutboundLink>
      );
    }

    return null;
  }
}

CallToAction.propTypes = {
  name: PropTypes.string,
  to: PropTypes.string,
  url: PropTypes.string,
  callToActionType: PropTypes.string,
};
