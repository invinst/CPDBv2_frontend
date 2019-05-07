import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Attachments from './attachments';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, pathname, onTrackingAttachment } = this.props;

    return (
      <Link
        className={ cx(styles.wrapper, 'timeline-item', 'test--timeline-cr-item') }
        to={ `/complaint/${item.crid}/` }
      >
        <div className='content'>
          <span className={ 'kind' }>C</span>
          <span className='detail'>
            <div className='category'>{ item.category }</div>
            <div className='subcategory'>{ item.subcategory }</div>
          </span>
          <span className='right'>
            <Attachments
              attachments={ item.attachments }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
            <span className='date'>{ item.incidentDate }</span>
          </span>
        </div>
      </Link>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func
};
