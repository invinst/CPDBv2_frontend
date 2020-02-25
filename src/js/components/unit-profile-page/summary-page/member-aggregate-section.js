import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get, filter, map } from 'lodash';

import {
  wrapperStyle, memberWrapperStyle, activeStatusStyle, totalStatusStyle, facetStyle, columnWrapperStyle,
  cellStyle, countStyle, nameStyle, genderWrapperStyle, genderCellStyle,
} from './member-aggregate-section.style';

const _getEntries = (facets, name) => get(filter(facets, facet => facet.name === name), '0.entries', []);


export default class MemberAggregateSection extends Component {

  _renderColumn(columnName, orientation) {
    const { memberFacets } = this.props;
    const entries = _getEntries(memberFacets, columnName);

    return (
      <div style={ columnWrapperStyle(orientation) } className={ `test--${columnName}-block` }>
        <span className='test--member-aggregate-title' style={ facetStyle }>{ columnName.toUpperCase() }</span>
        {
          map(entries, (entry, index) => {
            const isLastItem = index === entries.length - 1;
            return (
              <div key={ index } style={ cellStyle(isLastItem) }>
                <span className='test--member-aggregate-count' style={ countStyle }>{ entry.count }</span>
                <span className='test--member-aggregate-name' style={ nameStyle }>{ entry.name }</span>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderLeftColumn(columnName) {
    return this._renderColumn(columnName, 'left');
  }

  renderRightColumn(columnName) {
    return this._renderColumn(columnName, 'right');
  }

  renderGenders() {
    const { memberFacets } = this.props;
    const entries = _getEntries(memberFacets, 'gender');

    return (
      <div style={ genderWrapperStyle } className='test--gender-block'>
        <span className='test--member-aggregate-title' style={ facetStyle }>GENDER</span>
        {
          map(entries, (entry, index) => {
            const isBorderBottomHidden = entries.length % 2 === 1 ?
              index >= entries.length - 1 : index >= entries.length - 2;
            const isLeftEntry = index % 2 === 0;

            return (
              <div key={ index } style={ genderCellStyle(isBorderBottomHidden, isLeftEntry) }>
                <span className='test--member-aggregate-count' style={ countStyle }>{ entry.count }</span>
                <span className='test--member-aggregate-name' style={ nameStyle }>{ entry.name }</span>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { activeMembers, totalMembers } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--member-aggregate-status'
          style={ activeStatusStyle }>{ `${activeMembers} active members, ` }
          <span style={ totalStatusStyle }>{ `${totalMembers} all-time` }</span>
        </span>
        <div style={ memberWrapperStyle }>
          { this.renderLeftColumn('race') }
          { this.renderRightColumn('age') }
        </div>
        { this.renderGenders() }
      </div>
    );
  }
}


MemberAggregateSection.propTypes = {
  activeMembers: PropTypes.number,
  totalMembers: PropTypes.number,
  memberFacets: PropTypes.array,
};
