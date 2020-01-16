import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import MoreLink from 'components/common/more-link';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { ENTITY_LINK } from 'utils/constants';
import { linkStyle, pinkLinkStyle, linkWrapperStyle } from './link.style';
import { EditModeContext, SectionEditModeContext } from 'contexts';


function Link(props) {
  function renderWithResponsiveStyle(style) {
    const { children, entityKey, contentState } = props;
    const { editModeOn } = useContext(EditModeContext);
    const { sectionEditModeOn } = useContext(SectionEditModeContext);
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
  }

  return (
    <ResponsiveStyleComponent style={ linkWrapperStyle }>
      { renderWithResponsiveStyle }
    </ResponsiveStyleComponent>
  );
}

Link.propTypes = {
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
  children: PropTypes.node,
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
