import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import {
  wrapperStyle, mapStyle, sectionWithBorderStyle, sectionContentStyle, sectionStyle,
  contentStyle, sectionLabelStyle, accusedStyle
} from './complaint-card.style';


export default class ComplaintCard extends Component {
  render() {
    const { crid, lat, lon, categories, complainants, accuseds, className } = this.props;

    return (
      <Link className={ className } style={ wrapperStyle } to={ `/complaint/${crid}/` }>
        <div style={ mapStyle(lat, lon) } />
        <div style={ contentStyle }>
          <div style={ sectionWithBorderStyle }>
            <div style={ sectionLabelStyle }>CR { crid }</div>
            <div style={ sectionContentStyle }>{ categories }</div>
          </div>
          <div style={ sectionWithBorderStyle }>
            <div style={ sectionLabelStyle }>Complainant</div>
            <div style={ sectionContentStyle }>{ complainants }</div>
          </div>
          <div style={ sectionStyle }>
            <div style={ sectionLabelStyle }>Accused</div>
            <div style={ accusedStyle }>{ accuseds }</div>
          </div>
        </div>
      </Link>
    );
  }
}

ComplaintCard.propTypes = {
  crid: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
  categories: PropTypes.string,
  complainants: PropTypes.string,
  accuseds: PropTypes.string,
  className: PropTypes.string
};

export { itemWidth } from './complaint-card.style';
