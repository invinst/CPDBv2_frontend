import React, { PropTypes, Component } from 'react';
import { get, reduce } from 'lodash';

import withPinnableItem from './with-pinnable-item';
import { getOfficerSecondRowContent, getCRSecondRowContent } from './item-second-row';


export const OfficerItem = withPinnableItem(true, null, getOfficerSecondRowContent);
export const CRItem = withPinnableItem(true, null, getCRSecondRowContent);
export const TRRItem = withPinnableItem(true);
export const UnpinnableItem = withPinnableItem(false);

const COMPONENT_MAP = {
  OFFICER: OfficerItem,
  'DATE > OFFICERS': OfficerItem,
  'UNIT > OFFICERS': OfficerItem,
  CR: CRItem,
  'DATE > CR': CRItem,
  'INVESTIGATOR > CR': CRItem,
  'TRR': TRRItem,
  'DATE > TRR': TRRItem,
};

export default class SuggestionItem extends Component {
  shouldComponentUpdate(nextProps) {
    const keys = [
      'isFocused',
      'aliasEditModeOn',
      'suggestion.uniqueKey',
      'suggestion.isPinned',
    ];

    return reduce(keys, (memo, key) => (
      memo || get(nextProps, key) !== get(this.props, key)
    ), false);
  }

  render() {
    const { type } = this.props.suggestion;
    const ComponentType = get(COMPONENT_MAP, type, UnpinnableItem);
    return (
      <ComponentType { ...this.props }/>
    );
  }
}

SuggestionItem.propTypes = {
  suggestion: PropTypes.object,
  isFocused: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  selectItem: PropTypes.func,
};

SuggestionItem.defaultProps = {
  suggestion: {},
};
