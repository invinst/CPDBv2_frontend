import React, { PropTypes, Component } from 'react';
import { map, filter } from 'lodash';

import TextInput from 'components/common/input';
import {
  wrapperStyle, arrowUpStyle, inputStyle, dropdownStyle, dropdownItemStyle, inputWrapperStyle
} from './dropdown.style';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.filterDropdown = this.filterDropdown.bind(this);
  }

  filterDropdown(event) {
    this.setState({
      filterText: event.currentTarget.value
    });
  }

  getCommunities() {
    const { communities } = this.props;
    const { filterText } = this.state;

    return filter(communities, (community) =>
      community.name.toLowerCase().startsWith(filterText.toLowerCase())
    );
  }

  render() {
    const { selectCommunity, closeDropdown } = this.props;
    const { filterText } = this.state;
    const communities = this.getCommunities();

    return (
      <div style={ wrapperStyle }>
        <div style={ inputWrapperStyle }>
          <TextInput
            width={ 320 }
            height={ 320 }
            paddingVertical={ 23 }
            paddingHorizontal={ 16 }
            placeholder='Select a community'
            style={ inputStyle }
            value={ filterText }
            onChange={ this.filterDropdown }/>
          <div className='test--dropdown-up-arrow' style={ arrowUpStyle } onClick={ closeDropdown }/>
        </div>
        <div style={ dropdownStyle }>
          {
            map(communities, (community, index) => (
              <div
                className='test--dropdown-item'
                style={ dropdownItemStyle(index === communities.length - 1) }
                key={ community.id }
                onClick={ () => selectCommunity(community.id) }>
                { community.name }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  communities: PropTypes.array,
  closeDropdown: PropTypes.func,
  selectCommunity: PropTypes.func
};
