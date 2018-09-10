import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  wrapperStyle, mapStyle, sectionWithBorderStyle, sectionContentStyle, sectionStyle,
  contentStyle, sectionLabelStyle, accusedStyle, hoverableWrapperStyle
} from './complaint-card.style';
import * as GATracking from 'utils/google_analytics_tracking';


class ComplaintCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { sourceCRID, crid, match } = this.props;
    if (match === 'categories') {
      GATracking.trackRelatedByCategoryClick(sourceCRID, crid);
    } else if (match === 'officers') {
      GATracking.trackRelatedByAccusedClick(sourceCRID, crid);
    }
  }

  render() {
    const { crid, lat, lon, categories, complainants, accused, hovering } = this.props;

    return (
      <Link
        className='test--carousel-card'
        style={ wrapperStyle(hovering) }
        to={ `/complaint/${crid}/` }
        onClick={ this.handleClick } >
        <div style={ mapStyle(lat, lon) } />
        <div style={ contentStyle } >
          <div style={ sectionWithBorderStyle }>
            <div style={ sectionLabelStyle }>CR { crid }</div>
            <div style={ sectionContentStyle }>{ categories }</div>
          </div>
          {
            complainants
              ? (
                <div className='test--carousel-complainant' style={ sectionWithBorderStyle }>
                  <div style={ sectionLabelStyle }>Complainant</div>
                  <div style={ sectionContentStyle }>{ complainants }</div>
                </div>
                ) : null
          }
          {
            accused
              ? (
                <div className='test--carousel-accused' style={ sectionStyle }>
                  <div style={ sectionLabelStyle }>Accused</div>
                  <div style={ accusedStyle }>{ accused }</div>
                </div>
                ) : null
          }
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
  accused: PropTypes.string,
  hovering: PropTypes.bool,
  match: PropTypes.string,
  sourceCRID: PropTypes.string,
};

export { itemWidth } from './complaint-card.style';
export default Hoverable(ComplaintCard, 'div', hoverableWrapperStyle, 'swiper-slide');
