import React, { PropTypes, Component } from 'react';
import { debounce } from 'lodash';

import SearchTags from './search-tags';
import SearchResultsContainer from 'containers/search-page/search-results-container';
import SearchNoInput from './search-no-input';
import * as constants from 'utils/constants';
import { buttonsWrapperStyle, searchMainPanelStyle } from './search-main-panel.style';


export default class SearchMainPanel extends Component {
  constructor(props) {
    super(props);
    this.getSuggestion = debounce(props.getSuggestion, 100);
  }

  handleSelect(contentType) {
    if (contentType === constants.RECENT_CONTENT_TYPE) {
      return;
    } else if (contentType === this.props.contentType) {
      this.getSuggestion(this.props.query, { limit: 9 });
    } else {
      this.getSuggestion(this.props.query, { contentType });
    }
    this.props.resetNavigation();
  }

  render() {
    const {
      tags, contentType, recentSuggestions, query, editModeOn,
      officerCards, requestActivityGrid, aliasEditModeOn
    } = this.props;

    return (
      <div style={ searchMainPanelStyle }>
        <div style={ buttonsWrapperStyle }>
          <SearchTags
            tags={ tags }
            onSelect={ this.handleSelect.bind(this) }
            selected={ contentType }
          />
        </div>

        {
          query ?
            <SearchResultsContainer
              onLoadMore={ this.handleSelect.bind(this) }
              editModeOn={ editModeOn }
              aliasEditModeOn={ aliasEditModeOn }
            /> :
            <SearchNoInput
              recentSuggestions={ recentSuggestions }
              officerCards={ officerCards }
              requestActivityGrid={ requestActivityGrid }
            />
        }

      </div>
    );
  }
}

SearchMainPanel.propTypes = {
  tags: PropTypes.array,
  contentType: PropTypes.string,
  recentSuggestions: PropTypes.array,
  query: PropTypes.string,
  editModeOn: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  resetNavigation: PropTypes.func,
  getSuggestion: PropTypes.func
};

SearchMainPanel.defaultProps = {
  getSuggestion: () => {},
  resetNavigation: () => {}
};
