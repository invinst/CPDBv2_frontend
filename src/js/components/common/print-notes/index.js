import React, { PropTypes, Component } from 'react';

import styles from './print-notes.sass';


export default class PrintNotes extends Component {
  render() {
    const { notes } = this.props;
    return (
      <div className={ styles.printNotes }>
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

PrintNotes.propTypes = {
  notes: PropTypes.array,
};

PrintNotes.defaultProps = {
  notes: [],
};
