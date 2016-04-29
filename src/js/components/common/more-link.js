import React, {PropTypes} from 'react';
import Radium from 'radium';

import { linkStyle } from 'components/common/more-link.style';


class MoreLink extends React.Component {
  render() {
    return (<a href={ this.props.href } style={ linkStyle }>
      { this.props.children }
    </a>);
  }
}

MoreLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

export default Radium(MoreLink);
