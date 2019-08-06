import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import { mapStyle } from './complaint-card.style';
import * as GATracking from 'utils/google_analytics_tracking';
import styles from './complaint-card.sass';


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
    const { crid, lat, lon, categories, complainants, accused } = this.props;

    return (
      <Link
        className={ cx(styles.complaintCard, 'swiper-slide', 'test--carousel-card') }
        to={ `/complaint/${crid}/` }
        onClick={ this.handleClick } >
        <div className='complaint-card-map' style={ mapStyle(lat, lon) } />
        <div className='content'>
          <div className='section'>
            <div className='section-label'>CR { crid }</div>
            <div className='section-content nowrap-text'>{ categories }</div>
          </div>
          {
            complainants
              ? (
                <div className='section test--carousel-complainant'>
                  <div className='section-label'>Complainant</div>
                  <div className='section-content nowrap-text'>{ complainants }</div>
                </div>
              ) : null
          }
          {
            accused
              ? (
                <div className='section test--carousel-accused'>
                  <div className='section-label'>Accused</div>
                  <div className='section-content accused'>{ accused }</div>
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
  match: PropTypes.string,
  sourceCRID: PropTypes.string,
};

export { itemWidth } from './complaint-card.style';
export default ComplaintCard;
