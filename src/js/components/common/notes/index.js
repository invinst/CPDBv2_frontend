import React, { PropTypes, Component } from 'react';

import styles from './notes.sass';


export default class Notes extends Component {
  render() {
    const { notes } = this.props;
    return (
      <div className={ styles.notes }>
        <div className='notes-title'>Notes</div>
        {
          notes.map((note, index) => (
            <div className='notes-content' key={ index }>
              { `${note.title}: ${note.text}` }
            </div>
          ))
        }
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.array,
};

Notes.defaultProps = {
  notes: [],
};
