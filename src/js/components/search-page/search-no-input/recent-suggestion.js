import React, { Component, PropTypes } from 'react';


export default class RecentSuggestion extends Component {
  render() {
    const { recentSuggestions } = this.props;

    return (
      <div className='recent-suggestions'>
        <div>RECENT</div>
        <div>
        {
          recentSuggestions.map((entry, key) => (
            <div key={ key }>
              <span>{ entry.contentType } </span>
              <a href={ entry.url }>{ entry.text }</a>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}

RecentSuggestion.defaultProps = {
  recentSuggestions: []
};

RecentSuggestion.propTypes = {
  recentSuggestions: PropTypes.array
};
