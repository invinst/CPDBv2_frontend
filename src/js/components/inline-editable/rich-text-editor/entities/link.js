import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

import MoreLink from 'components/common/more-link';
import { ENTITY_LINK } from 'utils/constants';
import { linkStyle, pinkLinkStyle } from './link.style';


class Link extends Component {
  render() {
    const { children, entityKey } = this.props;
    const { editModeOn, sectionEditModeOn } = this.context;
    const styleFromContext = this.context.draftEntityStyle && this.context.draftEntityStyle[ENTITY_LINK];
    const { url } = Entity.get(entityKey).getData();
    if (!editModeOn) {
      return (
        <MoreLink href={ url } style={ styleFromContext }>
          { children }
        </MoreLink>
      );
    }
    return (
      <span style={ sectionEditModeOn ? pinkLinkStyle : linkStyle }>
        { children }
      </span>
    );
  }
}

Link.propTypes = {
  entityKey: PropTypes.string,
  children: PropTypes.node
};

Link.contextTypes = {
  editModeOn: PropTypes.bool,
  draftEntityStyle: PropTypes.object,
  sectionEditModeOn: PropTypes.bool
};

export default Link;

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && Entity.get(entityKey).getType() === ENTITY_LINK;
    },
    callback
  );
}
