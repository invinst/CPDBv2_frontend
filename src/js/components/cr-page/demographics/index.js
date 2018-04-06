import React, { PropTypes, Component } from 'react';

import { wrapperStyle, boxStyle } from './demographics.style';

export default class Demographics extends Component {
  render() {
    return (
      <div style={ wrapperStyle }>
        {
          this.props.persons.map((person, ind) => (
            <div key={ ind } style={ boxStyle }>
              { person }
            </div>
          ))
        }
      </div>
    );
  }
}

Demographics.propTypes = {
  persons: PropTypes.array
};

Demographics.defaultProps = {
  persons: []
};
