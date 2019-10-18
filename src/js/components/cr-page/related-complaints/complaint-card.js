import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { toLower } from 'lodash';

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

  renderSection(label, text, classnameSuffix) {
    return (
      <div className={ `section test--carousel-${classnameSuffix || toLower(label)}` }>
        <div className='section-label'>{ label }</div>
        <div className='section-content nowrap-text'>{ text }</div>
      </div>
    );
  }

  render() {
    const { crid, lat, lon, categories, complainants, accused, incidentDate } = this.props;

    return (
      <Link
        className={ cx(styles.complaintCard, 'swiper-slide', 'test--carousel-card') }
        to={ `/complaint/${crid}/` }
        onClick={ this.handleClick } >
        <div className='complaint-card-map' style={ mapStyle(lat, lon) } />
        <div className='content'>
          { this.renderSection(`CR ${ crid }`, categories, 'id-cat') }
          { incidentDate && this.renderSection('Date', incidentDate) }
          { complainants && this.renderSection('Complainant', complainants) }
          { accused && this.renderSection('Accused', accused) }
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
