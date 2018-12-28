import React, { PropTypes, Component } from 'react';
import { get, reduce } from 'lodash';

import OfficerItem from './officer';
import CRItem from './cr';
import SuggestionItemBase from './base';


const COMPONENT_MAP = {
  OFFICER: OfficerItem,
  'DATE > OFFICERS': OfficerItem,
  'UNIT > OFFICERS': OfficerItem,
  CR: CRItem,
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
    const ComponentType = get(COMPONENT_MAP, type, SuggestionItemBase);

    return (
      <ComponentType { ...this.props }/>
    );
  }
}

SuggestionItem.propTypes = {
  suggestion: PropTypes.object,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  selectItem: PropTypes.func,
};

SuggestionItem.defaultProps = {
  suggestion: {}
};
