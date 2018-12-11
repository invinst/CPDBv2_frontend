import React, { PropTypes, Component } from 'react';
import { chunk } from 'lodash';
import ReactMarkdown from 'react-markdown';

import styles from './print-notes.sass';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


export default class PrintNotes extends Component {
  render() {
    const { notes } = this.props;
    const notesLength = notes.length;
    const numberOfNotePerColumn = notesLength > 4 ? Math.round(notesLength / 2) : notesLength;
    const chunkNotes = chunk(notes, numberOfNotePerColumn);
    return (
      <div className={ styles.printNotes }>
        <div className='notes-title'>Notes</div>
        <div>
          {
            chunkNotes.map((chunkNote, index) => (
              <div className='notes-column' key={ index }>
                {
                  chunkNote.map((note, index) => (
                    <ReactMarkdown
                      key={ index }
                      className='notes-content'
                      source={ `${note.title}: ${note.text}` }
                      renderers={ { link: MarkdownLink } }
                    />
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
};

PrintNotes.defaultProps = {
  notes: [],
};
