import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { mapKeys } from 'lodash';

import { serializeFilterParams } from 'utils/location';
import SparklinesContainer from 'containers/officer-page/officer-sparkline-container';
import {
  entryStyle, countStyle, nameStyle, sustainedCountStyle
} from './aggregate-row.style';
import { officerPath } from 'utils/location';


export default class AggregateRow extends Component {
  getFilteredOfficerTimelineLink(facetName, name, pathname) {
    const timelineEventQuery = facetName ? { [facetName]: name } : {};
    const timelinePathname = officerPath('timeline', pathname);
    const urlParams = mapKeys(timelineEventQuery, (value, key) => key.replace('complainant ', ''));

    return (year) => {
      if (year) {
        urlParams.year = year;
      }
      const urlParamsString = serializeFilterParams(urlParams, '?');
      return timelinePathname + urlParamsString;
    };
  }

  render() {
    const { facetName, name, pathname, count, sustainedCount, items, startYear } = this.props;
    const getTimelineLink = this.getFilteredOfficerTimelineLink(facetName, name, pathname);

    return (
      <div style={ entryStyle }>
        <Link className='test--entry-name' style={ nameStyle } to={ getTimelineLink() }>{ name }</Link>
        <span className='test--entry-count' style={ countStyle }>{ count }</span>
        <span className='test--entry-sustained-count' style={ sustainedCountStyle(sustainedCount) }>
          { sustainedCount }
        </span>
        { items && (
          <SparklinesContainer getTimelineLink={ getTimelineLink } data={ items } startYear={ startYear }/>
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
