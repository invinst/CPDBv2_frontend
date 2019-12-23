import React, { PropTypes, Component } from 'react';
import { map, filter } from 'lodash';
import isMobile from 'ismobilejs';

import TextInput from 'components/common/input';
import {
  wrapperStyle, arrowUpStyle, inputStyle, dropdownStyle, dropdownItemStyle, inputWrapperStyle,
} from './dropdown.style';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
  }

  filterDropdown = event => {
    this.setState({
      filterText: event.currentTarget.value,
    });
  };

  getCommunities() {
    const { communities } = this.props;
    const { filterText } = this.state;

    return filter(communities, (community) =>
      community.name.toLowerCase().startsWith(filterText.toLowerCase())
    );
  }

  selectFirstCommunity() {
    const communities = this.getCommunities();
    if (communities.length > 0) {
      this.props.selectCommunity(communities[0].id);
    }
  }

  render() {
    const { selectCommunity, closeDropdown } = this.props;
    const { filterText } = this.state;
    const communities = this.getCommunities();

    return (
      <div style={ wrapperStyle }>
        <div style={ inputWrapperStyle }>
          <TextInput
            className='test--dropdown-text-input'
            width={ 320 }
            height={ 320 }
            autoFocus={ !isMobile.any }
            paddingVertical={ 23 }
            paddingHorizontal={ 16 }
            keyPressHandlers={ {
              enter: () => this.selectFirstCommunity(),
            } }
            placeholder='Select a community'
            style={ inputStyle }
            value={ filterText }
            onChange={ this.filterDropdown }/>
          <div className='test--dropdown-up-arrow' style={ arrowUpStyle } onClick={ closeDropdown }/>
        </div>
        <MinimalScrollBars style={ dropdownStyle }>
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
        </MinimalScrollBars>
      </div>
    );
  }
}

Dropdown.propTypes = {
  communities: PropTypes.array,
  closeDropdown: PropTypes.func,
  selectCommunity: PropTypes.func,
};
