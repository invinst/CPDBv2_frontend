import PropTypes from 'prop-types';
import React, { Component } from 'react';

import MoreLink from 'components/common/more-link';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE,
} from 'components/responsive/responsive-style-component';
import { ENTITY_LINK } from 'utils/constants';
import { linkStyle, pinkLinkStyle, linkWrapperStyle } from './link.style';


class Link extends Component {
  responsiveStyle() {
    let styleFromContext = this.context.draftEntityStyle && this.context.draftEntityStyle[ENTITY_LINK] || {};
    if (!styleFromContext[DESKTOP] && !styleFromContext[TABLET] && !styleFromContext[EXTRA_WIDE]) {
      return {
        [DESKTOP]: styleFromContext,
        [TABLET]: styleFromContext,
        [EXTRA_WIDE]: styleFromContext,
      };
    } else {
      return styleFromContext;
    }
  }

  renderWithResponsiveStyle = (style) => {
    const { children, entityKey, contentState } = this.props;
    const { editModeOn, sectionEditModeOn } = this.context;
    const { url } = contentState.getEntity(entityKey).getData();
    if (!editModeOn) {
      return (
        <MoreLink href={ url } style={ style }>
          { children }
        </MoreLink>
      );
    }
    return (
      <span style={ sectionEditModeOn ? pinkLinkStyle : linkStyle }>
        { children }
      </span>
    );
  };

  render() {
    return (
      <ResponsiveStyleComponent style={ linkWrapperStyle }
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle }
      </ResponsiveStyleComponent>
    );
  }
}

Link.propTypes = {
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
  children: PropTypes.node,
};

Link.contextTypes = {
  editModeOn: PropTypes.bool,
  draftEntityStyle: PropTypes.object,
  sectionEditModeOn: PropTypes.bool,
};

export default Link;

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === ENTITY_LINK;
    },
    callback
  );
}
