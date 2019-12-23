import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Attachments from './attachments';
import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './cr.sass';


export default function Cr(props) {
  const { item, changeOfficerTab, pathname, onTrackingAttachment } = props;
  const { printMode } = this.context;

  return (
    <Link
      to={ `/complaint/${item.crid}/` }
      className={ cx(baseStyles.baseItem, styles.cr) }
    >
      <span className='item-content cr-item-content'>
        <div className='item-wrapper-kind'>
          <span className={ cx('cr-item-kind', 'item-kind', { 'active': item.finding === 'Sustained' }) }>
            { printMode ? `CR ${item.crid}` : 'Complaint' }
          </span>
        </div>
        <span className='cr-detail'>
          <div
            className='item-category cr-item-category'>
            { item.category }
          </div>
          <div className='cr-item-finding'>{ item.finding }, { item.outcome }</div>
        </span>
        <span className='cr-right'>
          <span className='cr-item-coaccused no-print'>1 of { item.coaccused } coaccused</span>
          <Attachments
            attachments={ item.attachments }
            changeOfficerTab={ changeOfficerTab }
            pathname={ pathname }
            onTrackingAttachment={ onTrackingAttachment }
          />
          <span className='item-date cr-item-date'>{ item.date }</span>
        </span>
      </span>
    </Link>
  );
}

Cr.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};

Cr.contextTypes = {
  printMode: PropTypes.bool,
};
