import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { take, slice } from 'lodash';

import styles from './base-complaint-card.sass';
import MiniVisualToken from './mini-officer-visual-token';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


export class BaseComplaintCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { crid, addItemToPinboard } = this.props;
    e.preventDefault();
    addItemToPinboard({ type: 'CR', id: crid, isPinned: false });
  }

  render() {
    const {
      crid,
      incidentDate,
      category,
      officers,
      leftChild,
      pinned,
    } = this.props;

    const topOfficers = take(officers, 2);
    const otherOfficers = slice(officers, 2, 7);
    const notShowingOfficerCount = officers.length - topOfficers.length - otherOfficers.length;

    return (
      <div className={ styles.baseComplaintCard }>
        <div className='left-half'>
          { leftChild }
        </div>
        <Link to={ `/complaint/${crid}/` } className='right-half'>
          <div className='incident-date'>{ incidentDate }</div>
          <div className='category'>{ category }</div>
          <div className='top-officers'>
            { topOfficers.map(officer =>
              <div className='top-officer-row' key={ officer.id }>
                <MiniVisualToken className='top-officer-row-token' percentile={ officer.percentile }/>
                <div className='top-officer-row-officer-name'>{ officer.shortName }</div>
              </div>
            ) }
          </div>
          <div className='remaining-officers'>
            { otherOfficers.map(officer =>
              <MiniVisualToken className='remaining-officer' key={ officer.id } percentile={ officer.percentile }/>
            )}
            {
              notShowingOfficerCount > 0 ?
                <div className='not-showing-officer-count'>{ `${ notShowingOfficerCount }+` }</div>
                : null
            }
          </div>
          { pinned ? null : <PlusButton onClick={ this.handleClick }/> }
        </Link>
      </div>
    );
  }
}

BaseComplaintCard.propTypes = {
  leftChild: PropTypes.node,
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  crid: PropTypes.string,
  incidentDate: PropTypes.string,
  category: PropTypes.string,
  officers: PropTypes.arrayOf(PropTypes.object),
  addItemToPinboard: PropTypes.func,
  pinned: PropTypes.bool,
};

export default BaseComplaintCard;
