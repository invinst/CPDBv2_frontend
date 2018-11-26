import React, { PropTypes, Component } from 'react';

import styles from './demographic.sass';
import cx from 'classnames';

export default class Demographics extends Component {
  render() {
    return (
      <div>
        {
          this.props.persons.map((person, ind) => (
            <div key={ ind } className={ cx(styles.demographic, 'test--person-demographic') }>
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
