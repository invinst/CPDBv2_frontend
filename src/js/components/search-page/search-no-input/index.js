import React, { Component } from 'react';

import { resultWrapperStyle, helperTextStyle, recentRandomWrapperStyle } from './search-no-input.style';
import RecentSuggestion from './recent-suggestion';


export default class SuggestionNoInput extends Component {
  render() {
    return (
      <div style={ resultWrapperStyle }>
        <div style={ helperTextStyle }>
          Type the name of a police officer, badge number, or CRID number.
        </div>
        <div style={ recentRandomWrapperStyle }>
          <RecentSuggestion/>
        </div>
      </div>
    );
  }
}
