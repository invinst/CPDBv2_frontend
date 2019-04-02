import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { take, slice } from 'lodash';

import styles from './relevant-document-card.sass';
import MiniVisualToken from 'components/pinboard-page/relevant/relevant-documents/mini-officer-visual-token';


export class RelevantDocumentCard extends Component {
  render() {
    const {
      allegation,
      url,
      previewImageUrl,
    } = this.props;

    const { crid, incidentDate, category, officers } = allegation;
    const topOfficers = take(officers, 2);
    const otherOfficers = slice(officers, 2, 7);
    const notShowingOfficerCount = officers.length - topOfficers.length - otherOfficers.length;

    return (
      <div className={ styles.relevantDocumentCard }>
        <div className='left-half'>
          <a
            className='document-card-thumbnail'
            href={ url }
            target='_blank'
          >
            <img className='document-card-thumbnail-img' src={ previewImageUrl } alt='Document preview image'/>
          </a>
        </div>
        <Link to={ `/complaint/${crid}/` } className='right-half'>
          <div className='incident-date'>{ incidentDate }</div>
          <div className='category'>{ category }</div>
          <div className='top-officers'>
            { topOfficers.map(officer =>
              <div className='top-officer-row' key={ officer.id }>
                <div className='top-officer-row-token'><MiniVisualToken percentile={ officer.percentile }/></div>
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
        </Link>
      </div>
    );
  }
}

RelevantDocumentCard.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  allegation: PropTypes.object,
};

export default RelevantDocumentCard;
