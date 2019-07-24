import getEditModeOn from 'selectors/pinboard-page/edit-mode-on';

describe.only('editModeOn', function () {
  it('should return correct state', function () {
    getEditModeOn({
      pinboardPage: {
        editModeOn: {
          EMPTY_PINBOARD_TITLE: false,
          EMPTY_PINBOARD_DESCRIPTION: false
        },
      }
    }).should.eql({
      EMPTY_PINBOARD_TITLE: false,
      EMPTY_PINBOARD_DESCRIPTION: false
    });
  });
});
