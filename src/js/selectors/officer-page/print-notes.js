import { filter, includes, indexOf, sortBy } from 'lodash';


export const getInfoNotes = state => {
  const noteNames = [
    'salary', 'allegation', 'trr', 'civilian_compliment', 'sustained', 'major_award', 'honorable_mention',
  ];
  return getNotes(state, noteNames);
};

export const getTimelineNotes = state => {
  return getNotes(state, ['rank', 'unit']);
};

const getNotes = (state, noteNames) => {
  const unorderedNote = filter(state.popups, popup => includes(noteNames, popup.name));
  return sortBy(unorderedNote, note => indexOf(noteNames, note.name));
};
