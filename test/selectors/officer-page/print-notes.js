import { getInfoNotes, getTimelineNotes } from 'selectors/officer-page/print-notes';


describe('PrintNotes selector', function () {
  const state = {
    popups: [
      { name: 'salary', title: 'Salary', text: 'This is salary note' },
      { name: 'trr', title: 'TRR', text: 'This is trr note' },
      { name: 'allegation', title: 'Allegation', text: 'This is allegation note' },
      { name: 'unit', title: 'Unit', text: 'This is unit note' },
      { name: 'sustained', title: 'Sustained', text: 'This is sustained note' },
      { name: 'rank', title: 'Rank', text: 'This is rank note' },
      { name: 'honorable_mention', title: 'Honorable Mention', text: 'This is honorable mention note' },
      { name: 'major_award', title: 'Major Award', text: 'This is major award note' },
      { name: 'civilian_compliment', title: 'Civilian Compliment', text: 'This is civilian compliment note' },
    ],
  };

  describe('getInfoNotes', function () {
    it('should return correct ordered array', function () {
      getInfoNotes(state).should.eql([
        { name: 'salary', title: 'Salary', text: 'This is salary note' },
        { name: 'allegation', title: 'Allegation', text: 'This is allegation note' },
        { name: 'trr', title: 'TRR', text: 'This is trr note' },
        { name: 'civilian_compliment', title: 'Civilian Compliment', text: 'This is civilian compliment note' },
        { name: 'sustained', title: 'Sustained', text: 'This is sustained note' },
        { name: 'major_award', title: 'Major Award', text: 'This is major award note' },
        { name: 'honorable_mention', title: 'Honorable Mention', text: 'This is honorable mention note' },
      ]);
    });
  });

  describe('getTimelineNotes', function () {
    it('should return correct ordered array', function () {
      getTimelineNotes(state).should.eql([
        { name: 'rank', title: 'Rank', text: 'This is rank note' },
        { name: 'unit', title: 'Unit', text: 'This is unit note' },
      ]);
    });
  });
});

