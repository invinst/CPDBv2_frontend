import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { capitalize } from 'lodash';

import Row from 'components/common/row';
import Hoverable from 'components/common/higher-order/hoverable';
import OutboundLink from 'components/common/outbound-link';


const labelMapping = {
  'CR': 'CR',
  'TRR': 'TRR',
  'DATE > CR': 'Date > CR',
  'DATE > TRR': 'Date > TRR',
  'DATE > OFFICERS': 'Date > Officers',
};

class RecentSuggestionItem extends Component {
  render() {
    const { entry, hovering, isLast } = this.props;

    const labelText = labelMapping[entry.contentType] || capitalize(entry.contentType);

    const children = (
      <Row
        label={ labelText }
        labelWidth={ 115 }
        content={ entry.text }
        contentWidth={ 900 }
        hasBorderBottom={ !isLast }
        hovering={ hovering }
      />
    );

    const linkStyle = {
      textDecoration: 'none',
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
  entry: {},
};

RecentSuggestionItem.propTypes = {
  entry: PropTypes.object,
  hovering: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default Hoverable(RecentSuggestionItem);
