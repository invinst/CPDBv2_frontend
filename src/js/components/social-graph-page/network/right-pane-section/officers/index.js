import React, { Component, PropTypes } from 'react';

import styles from './officers.sass';
import OfficerRow from './officer-row';


export default class Officers extends Component {
  render() {
    const { officers, updateSelectedOfficerId } = this.props;

    return (
      <div className={ styles.officersSection }>
        {
          officers.map((officer) => (
            <OfficerRow
              key={ officer.id }
              officer={ officer }
              updateSelectedOfficerId={ updateSelectedOfficerId }
            />
          ))
        }
      </div>
    );
  }
}

Officers.propTypes = {
  officers: PropTypes.array,
  officer: PropTypes.object,
  updateSelectedOfficerId: PropTypes.func,
};

Officers.defaultProps = {
  officers: [],
};
