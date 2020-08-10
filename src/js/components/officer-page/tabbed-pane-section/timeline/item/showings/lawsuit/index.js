import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './lawsuit.sass';
import { PrintModeContext } from 'contexts';
import Attachments from '../cr/attachments';


export default function Lawsuit(props) {
  const { item, changeOfficerTab, pathname, onTrackingAttachment } = props;
  const { printMode } = useContext(PrintModeContext);
  return (
    <Link className={ cx(baseStyles.baseItem, styles.lawsuitRow) } to={ `/lawsuit/${item.caseNo}/` }>
      <span className='item-content lawsuit-item-content'>
        <div className='item-wrapper-kind'>
          <span className='item-kind lawsuit-item-kind'>{ printMode ? `Lawsuit ${item.caseNo}` : 'Lawsuit' }</span>
        </div>
        <span className='lawsuit-detail'>
          <div
            className='item-category lawsuit-item-category'>
            { item.misconduct }
          </div>
          <div className='lawsuit-item-finding'>{ item.outcome }</div>
        </span>
        <span className='lawsuit-right'>
          <Attachments
            attachments={ item.attachments }
            changeOfficerTab={ changeOfficerTab }
            pathname={ pathname }
            onTrackingAttachment={ onTrackingAttachment }
          />
          <span className='item-date lawsuit-item-date'>{ item.date }</span>
        </span>
      </span>
    </Link>
  );
}

Lawsuit.propTypes = {
  item: PropTypes.object,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};
