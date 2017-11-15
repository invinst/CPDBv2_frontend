import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SEARCH_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import { searchSectionStyle, searchBoxStyle } from './search-section.style';
import MediaQuery from 'react-responsive';


const SearchSection = (props, context) => {
  const to = context.editModeOn ? editMode(SEARCH_PATH) : `/${SEARCH_PATH}`;

  return (
    <div style={ searchSectionStyle }>
      <MediaQuery maxWidth={ 991 }>
        <Link style={ searchBoxStyle(false) } to={ to }>Search</Link>
      </MediaQuery>
      <MediaQuery minWidth={ 992 }>
        <Link style={ searchBoxStyle(true) } to={ to }>Search</Link>
      </MediaQuery>
    </div>
  );
};

SearchSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default SearchSection;
