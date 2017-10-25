import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { mapKeys } from 'lodash';

import { serializeFilterParams } from 'utils/location';
import SparklinesContainer from 'containers/officer-page/officer-sparkline-container';
import {
  entryStyle, countStyle, nameStyle, sustainedCountStyle
} from './aggregate-row.style';
import { officerPath } from 'components/officer-page/header';


export default class AggregateRow extends Component {
  getFilteredOfficerTimelineLink() {
    const { facetName, name, pathname } = this.props;
    const timelineEventQuery = facetName ? { [facetName]: name } : {};

    let urlParams = mapKeys(timelineEventQuery, (value, key) => key.replace('complainant ', ''));
    const urlParamsString = serializeFilterParams(urlParams, '?');
    return officerPath('timeline')(pathname) + urlParamsString;
  }

  render() {
    const { name, count, sustainedCount, items, startYear } = this.props;
    const timelineLink = this.getFilteredOfficerTimelineLink();

    return (
      <div style={ entryStyle }>
        <Link className='test--entry-name' style={ nameStyle } to={ timelineLink }>{ name }</Link>
        <span className='test--entry-count' style={ countStyle }>{ count }</span>
        <span className='test--entry-sustained-count' style={ sustainedCountStyle(sustainedCount) }>
          { sustainedCount }
        </span>
        { items && (
          <SparklinesContainer timelineLink={ timelineLink } data={ items } startYear={ startYear }/>
        ) }
      </div>
    );
  }
}

AggregateRow.propTypes = {
  name: PropTypes.string,
  facetName: PropTypes.string,
  count: PropTypes.number,
  sustainedCount: PropTypes.number,
  items: PropTypes.array,
  startYear: PropTypes.number,
  pathname: PropTypes.string
};

AggregateRow.defaultProps = {
  pathname: ''
};
