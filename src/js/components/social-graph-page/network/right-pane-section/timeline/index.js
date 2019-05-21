import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';


export default class Timeline extends Component {
  render() {
    const { items, pathname, onTrackingAttachment } = this.props;

    return (
      <div className={ cx(style.officerTimeline, 'test--officer-timeline') }>
        {
          items.map((item, index) => (
            <Item
              item={ item }
              key={ index }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
          ))
        }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};

Timeline.defaultProps = {
  items: [],
};
