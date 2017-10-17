import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SEARCH_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import { searchSectionStyle, searchBoxStyle } from './search-section.style';

const SearchSection = (props, context) => {
  const to = context.editModeOn ? editMode(SEARCH_PATH) : `/${SEARCH_PATH}`;

  return (
    <div style={ searchSectionStyle }>
      <Link style={ searchBoxStyle } to={ to }>Search</Link>
    </div>
  );
};

SearchSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default SearchSection;
