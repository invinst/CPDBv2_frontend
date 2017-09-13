import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SEARCH_PATH } from 'utils/constants';
import { searchSectionStyle, searchBoxStyle } from './search-section.style';

const SearchSection = (props, context) => {
  const editPath = context.editModeOn ? '/edit' : '';
  const to = `${editPath}/${SEARCH_PATH}`;

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
