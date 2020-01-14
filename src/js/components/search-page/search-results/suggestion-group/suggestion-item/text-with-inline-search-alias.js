import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as constants from 'utils/constants';


export default class TextWithInlineSearchAlias extends Component {
  handleAliasButtonClick = e => {
    e.stopPropagation();
    const { setAliasAdminPageContent, content } = this.props;

    setAliasAdminPageContent(content);
  };

  render() {
    const { textClassName, aliasClassName, text, aliasEditModeOn } = this.props;


    return (
      <div className={ textClassName }>
        { text }
        {
          aliasEditModeOn &&
            <Link
              className={ aliasClassName }
              to={ `/edit${constants.INLINE_SEARCH_ALIAS_ADMIN_PATH}` }
              onClick={ this.handleAliasButtonClick }>
              Alias
            </Link>
        }
      </div>
    );
  }
}

TextWithInlineSearchAlias.propTypes = {
  textClassName: PropTypes.string,
  aliasClassName: PropTypes.string,
  text: PropTypes.string,
  aliasEditModeOn: PropTypes.bool,
  setAliasAdminPageContent: PropTypes.func,
  content: PropTypes.object,
};
