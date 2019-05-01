import React, { Component, PropTypes } from 'react';

import styles from './officers-section.sass';
import OfficerRow from './officer-row';


export default class OfficersSection extends Component {
  render() {
    const { officers, updateOfficerId } = this.props;

    return (
      <div className={ styles.officersSection }>
        {
          officers.map((officer) => (
            <OfficerRow
              key={ officer.id }
              officer={ officer }
              updateOfficerId={ updateOfficerId }
            />
          ))
        }
      </div>
    );
  }
}

OfficersSection.propTypes = {
  officers: PropTypes.array,
  officer: PropTypes.object,
  updateOfficerId: PropTypes.func,
};

OfficersSection.defaultProps = {
  officers: [],
};
