import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './trr.sass';
import { PrintModeContext } from 'contexts';


export default function Trr(props) {
  const { item } = props;
  const { printMode } = useContext(PrintModeContext);

  return (
    <Link className={ cx(baseStyles.baseItem, styles.trr) } to={ `/trr/${item.trrId}/` }>
      <span className='item-content trr-item-content'>
        <div className='item-wrapper-kind'>
          <span className='item-kind trr-item-kind'>{ printMode ? `TRR ${item.trrId}` : 'Force' }</span>
        </div>
        <span className='item-category trr-item-category'>
          { item.category }
        </span>
        <span className='item-date trr-item-date'>{ item.date }</span>
      </span>
    </Link>
  );
}

Trr.propTypes = {
  item: PropTypes.object,
};
