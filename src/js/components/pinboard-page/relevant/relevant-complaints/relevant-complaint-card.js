import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './relevant-complaint-card.sass';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import { getComplaintMapUrl } from 'utils/mapbox';


export class RelevantComplaintCard extends Component {
  render() {
    const {
      crid,
      incidentDate,
      category,
      officers,
      point,
      addItemToPinboard,
    } = this.props;

    const leftChild = (
      <Link
        to={ `/complaint/${crid}/` }
        className={ styles.relevantComplaintMap }
        style={ point ? {
          background: `url("${getComplaintMapUrl(point.lat, point.lon, 130, 176)}") no-repeat center/cover`
        }: null }
      />
    );

    return (
      <BaseComplaintCard
        crid={ crid }
        incidentDate={ incidentDate }
        category={ category }
        officers={ officers }
        leftChild={ leftChild }
        addItemToPinboard={ addItemToPinboard }
      />
    );
  }
}

RelevantComplaintCard.propTypes = {
  crid: PropTypes.string,
  incidentDate: PropTypes.string,
  category: PropTypes.string,
  officers: PropTypes.arrayOf(PropTypes.object),
  point: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number
  }),
  addItemToPinboard: PropTypes.func,
};

export default RelevantComplaintCard;
