import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';


export default class Timeline extends Component {
  renderItems() {

    const { items, pathname, onTrackingAttachment } = this.props;
    return (
      <div>
        {
          items.map((item, index) => {
            return (
              <Item
                item={ item }
                key={ index }
                pathname={ pathname }
                onTrackingAttachment={ onTrackingAttachment }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className={ cx(style.officerTimeline, 'test--officer-timeline') }>
        { this.renderItems() }
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
