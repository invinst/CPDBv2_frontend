import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import _ from 'lodash';

import styles from './complaint-summary-card.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';


export default class ComplaintSummaryCard extends React.Component {
  render() {

    const { summary, incidentDate, categoryNames, crid, addOrRemoveItemInPinboard, isPinned } = this.props;
    const categories = _.join(categoryNames, ', ');

    return (
      <Link
        to={ `/complaint/${crid}/` }
        className={ styles.complaintSummaryCard }
      >
        <ItemPinButton
          className={ pinButtonStyles.cardPinnedButton }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          showHint={ false }
          item={ {
            type: PINNED_ITEM_TYPES.CR,
            id: crid,
            isPinned,
            incidentDate,
            category: categories,
          } }
        />
        <div className='complaint-summary-card-title'>
          <div className='complaint-summary-card-title-date'>
            { moment(incidentDate, 'YYYY-MM-DD').format('ll') }
          </div>
          <div className='complaint-summary-card-title-category'>{ categories }</div>
        </div>
        <div className='complaint-summary-card-summary'>
          { summary }
          <div className='complaint-summary-card-summary-gradient'/>
        </div>
      </Link>
    );
  }
}

ComplaintSummaryCard.propTypes = {
  crid: PropTypes.string,
  summary: PropTypes.string,
  incidentDate: PropTypes.string,
  categoryNames: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};
