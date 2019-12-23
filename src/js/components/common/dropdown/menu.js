import React, { PropTypes } from 'react';
import { get } from 'lodash';

import styles from './menu.sass';


export default function Menu(props) {
  const { options, onSelect, selectedIndex } = props;
  const labels = get(props, 'labels', props.options);
  return (
    <div className={ styles.dropdownMenu }>
      {
        options.map((option, index) => (
          option !== options[selectedIndex] ? (
            <div
              key={ index }
              className='dropdown-menu-item'
              onClick={ () => onSelect(index) }
            >
              { labels[index] }
            </div>
          ) : null
        ))
      }
    </div>
  );
}

Menu.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  labels: PropTypes.array,
};

Menu.defaultProps = {
  options: [],
};
