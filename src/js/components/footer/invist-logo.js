import React, { PropTypes, Component } from 'react';

import OutboundLink from 'components/common/outbound-link';
import Hoverable from 'components/common/higher-order/hoverable';
import { INVISIBLE_INSTITUTE_URL } from 'utils/constants';
import { invistStyle } from './invist-logo.style';

class InvistLogo extends Component {
  render() {
    const { hovering } = this.props;

    return (
      <OutboundLink
        className='test--footer-invinst-logo'
        style={ invistStyle(hovering) }
        href={ INVISIBLE_INSTITUTE_URL } />
    );
  }
}

InvistLogo.propTypes = {
  hovering: PropTypes.bool
};

export default Hoverable(InvistLogo);
