import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Attachments from './attachments';
import baseStyles from '../base-item.sass';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, changeOfficerTab, pathname, } = this.props;
    const { printMode } = this.context;

    return (
      <Link
        to={ `/complaint/${item.crid}/` }
        className={ cx(baseStyles.baseItem, styles.cr, 'test--cr-item') }
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
            <Attachments attachments={ item.attachments } changeOfficerTab={ changeOfficerTab } pathname={ pathname } />
            <span className='item-date cr-item-date'>{ item.date }</span>
          </span>
        </span>
      </Link>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
};

Cr.contextTypes = {
  printMode: PropTypes.bool,
};
