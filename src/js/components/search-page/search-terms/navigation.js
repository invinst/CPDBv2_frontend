import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import NavigationItem from './navigation-item';
import { wrapperStyle } from './navigation.style';


export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    return (
      <NavigationItem
        text={ item }
        key={ index }
        onClick={ () => this.props.onSelectItem(index) }/>
    );
  }

  render() {
    const { items } = this.props;

    return (
      <div style={ wrapperStyle }>
        {
          map(items, this.renderItem)
        }
      </div>
    );
  }
}

Navigation.propTypes = {
  items: PropTypes.array,
  onSelectItem: PropTypes.func
};
