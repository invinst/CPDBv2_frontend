import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

import { linkStyle } from './link.style';


export default class Link extends Component {
  render() {
    const { entityKey, children } = this.props;
    const url = Entity.get(entityKey).getData();

    return (
      <a
        href={ url }
        style={ linkStyle } >
        { children }
      </a>
    );
  }
}

Link.propTypes = {
  entityKey: PropTypes.string,
  children: PropTypes.node
};

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
    },
    callback
  );
}
