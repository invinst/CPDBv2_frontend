import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from './item-unpin-button';
import styles from './trr-card.sass';
import { startAnimation } from 'utils/animation';


export default class TRRCard extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const { isAdded } = this.props;
    if (isAdded) {
      startAnimation(() => this.el.classList.add('fade-in'));
    }
  }

  removeItem() {
    this.el.classList.add('fade-out');

    const { item, removeItemInPinboardPage } = this.props;
    const { type, id, isPinned } = item;

    setTimeout(
      () => removeItemInPinboardPage({ type, id, isPinned }),
      1000
    );
  }

  render() {
    const { item, isAdded } = this.props;
    const { trrDate, point, category } = item;

    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <div className={ cx(styles.wrapper, { hide: isAdded }) } ref={ el => this.el = el }>
        <ItemUnpinButton onClick={ this.removeItem }/>
        {
        (point === null) ?
          <div className='trr-card-map empty-map' />
          :
          <div
            className='trr-card-map'
            style={ mapStyle(
              cardMapConfig['lat'],
              cardMapConfig['lon'],
              cardMapConfig['width'],
              cardMapConfig['height']) } />
        }
        <div className='trr-card-body'>
          <span className='trr-date'>{ trrDate }</span>
          <span className='trr-category'>{ category }</span>
        </div>
      </div>
    );
  }
}

TRRCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  isAdded: PropTypes.bool,
};

TRRCard.defaultProps = {
  isAdded: false,
  removeItemInPinboardPage: () => {},
};
