import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

import { linkStyle } from './link.style';


class Link extends Component {
  render() {
    const { children } = this.props;

    return (
      <span style={ linkStyle }>
        { children }
      </span>
    );
  }
}

Link.propTypes = {
  entityKey: PropTypes.string,
  hovering: PropTypes.bool,
  children: PropTypes.node
};

export default Link;

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
    },
    callback
  );
}
