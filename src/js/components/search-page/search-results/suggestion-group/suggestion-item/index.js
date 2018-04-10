import React, { PropTypes, Component } from 'react';
import { get, reduce } from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import OfficerItem from './officer';
import SuggestionItemBase from './base';


const COMPONENT_MAP = {
  OFFICER: OfficerItem
};

export default class SuggestionItem extends Component {
  shouldComponentUpdate(nextProps) {
    const keys = [
      'hovering',
      'isFocused',
      'aliasEditModeOn',
      'suggestion.uniqueKey'
    ];

    return reduce(keys, (memo, key) => (
      memo || get(nextProps, key) !== get(this.props, key)
    ), false);
  }

  render() {
    const { type } = this.props.suggestion;
    const ComponentType = Hoverable(get(COMPONENT_MAP, type, SuggestionItemBase));

    return (
      <div onClick={ this.props.onClick }>
        <ComponentType { ...this.props }/>
      </div>
    );
  }
}

SuggestionItem.propTypes = {
  suggestion: PropTypes.object,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  onClick: PropTypes.func,
};

SuggestionItem.defaultProps = {
  suggestion: {}
};
