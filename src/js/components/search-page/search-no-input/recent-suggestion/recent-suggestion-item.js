import React, { Component, PropTypes } from 'react';
import S from 'string';
import { Link } from 'react-router';

import Row from 'components/common/row';
import Hoverable from 'components/common/higher-order/hoverable';
import OutboundLink from 'components/common/outbound-link';


class RecentSuggestionItem extends Component {
  render() {
    const { entry, hovering, isLast } = this.props;

    const children = (
      <Row
        label={ S(entry.contentType).capitalize().s }
        labelWidth={ 115 }
        content={ entry.text }
        contentWidth={ 900 }
        hasBorderBottom={ !isLast }
        hovering={ hovering }
      />
    );

    const linkStyle = {
      textDecoration: 'none'
    };

    if (entry.to) {
      return (
        <Link to={ entry.to } style={ linkStyle }>{ children }</Link>
      );
    }

    return (
      <OutboundLink href={ entry.url } style={ linkStyle }>{ children }</OutboundLink>
    );
  }
}

RecentSuggestionItem.defaultProps = {
  entry: {}
};

RecentSuggestionItem.propTypes = {
  entry: PropTypes.object,
  hovering: PropTypes.bool,
  isLast: PropTypes.bool
};

export default Hoverable(RecentSuggestionItem);
