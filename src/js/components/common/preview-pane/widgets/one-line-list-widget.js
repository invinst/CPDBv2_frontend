import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from './one-line-list-widget.sass';


export default class OneLineListWidget extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul className={ styles.oneLineListWidget }>
        { items.map((item, index) => (
          <li className='list-item' key={ index }>
            <span className='list-item-title'> { item.title }</span>
            <span className={ cx('list-item-text', { 'has-title': !isEmpty(item.title) }) }> { item.text }</span>
            <div className='clearfix'/>
          </li>
        )) }
      </ul>
    );
  }
}

OneLineListWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  })),
};

