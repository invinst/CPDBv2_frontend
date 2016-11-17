import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

import MoreLink from 'components/common/more-link';
import UnderlineText from 'components/common/underline-text';
import { pinkLinkStyle } from './link.style';


class Link extends Component {
  render() {
    const { children, entityKey } = this.props;
    const { editModeOn, sectionEditModeOn } = this.context;
    const { url } = Entity.get(entityKey).getData();
    if (!editModeOn) {
      return (
        <MoreLink href={ url }>
          { children }
        </MoreLink>
      );
    }
    return (
      <UnderlineText style={ sectionEditModeOn ? pinkLinkStyle : {} }>
        { children }
      </UnderlineText>
    );
  }
}

Link.propTypes = {
  entityKey: PropTypes.string,
  children: PropTypes.node
};

Link.contextTypes = {
  editModeOn: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool
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
