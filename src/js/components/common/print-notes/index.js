import React, { PropTypes, Component } from 'react';
import { chunk } from 'lodash';

import styles from './print-notes.sass';


export default class PrintNotes extends Component {
  render() {
    const { notes, className } = this.props;
    const notesLength = notes.length;
    const numberOfNotePerColumn = notesLength > 4 ? Math.round(notesLength / 2) : notesLength;
    const chunkNotes = chunk(notes, numberOfNotePerColumn);
    return (
      <div className={ `${styles.printNotes} ${className}` }>
        <div className='notes-title'>Notes</div>
        <div>
          {
            chunkNotes.map((chunkNote, index) => (
              <div className='notes-column' key={ index }>
                {
                  chunkNote.map((note, index) => (
                    <div className='notes-content' key={ index }>
                      { `${note.title}: ${note.text}` }
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

PrintNotes.propTypes = {
  notes: PropTypes.array,
  className: PropTypes.string,
};

PrintNotes.defaultProps = {
  notes: [],
};
