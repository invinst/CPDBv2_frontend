import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './simple-list-widget.sass';
import WrappedWithLink from 'components/common/wrapped-with-link';


export default class SimpleListWidget extends Component {
  render() {
    const { items, className } = this.props;

    return (
      items && items.length > 0 ? (
        <div className={ cx(styles.simpleListWidget, className) }>
          {
            items.map((item, index) => (
              <WrappedWithLink className='list-item' key={ index } url={ item.url } to={ item.to }>
                <span className='list-item-name'>{ item.name }</span>
                <span className='list-item-value'>{ item.value }</span>
              </WrappedWithLink>
            ))
          }
        </div>
      ) : null
    );
  }
}

SimpleListWidget.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};
