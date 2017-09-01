import React from 'react';
import { Link } from 'react-router';
import { SEARCH_PATH } from 'utils/constants';
import { searchSectionStyle, searchBoxStyle } from './search-section.style';

const SearchSection = (props) => (
  <div style={ searchSectionStyle }>
    <Link style={ searchBoxStyle } to={ '/' + SEARCH_PATH }>Search</Link>
  </div>
);

export default SearchSection;
