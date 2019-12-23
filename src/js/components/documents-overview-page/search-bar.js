import PropTypes from 'prop-types';
import React, { Component } from 'react';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './search-bar.sass';

export default class SearchBar extends Component {
  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return (
      <div className={ styles.wrapper }>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <div className={ styles.innerWrapper }>
            <div className='search-box-parent'>
              <input
                value={ value }
                onChange={ this.handleChange.bind(this) }
                type='text'
                className={ styles.searchBox }
                placeholder='Search' />
              <span className='search-icon' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

SearchBar.defaultProps = {
  onChange: () => {},
  value: '',
};
