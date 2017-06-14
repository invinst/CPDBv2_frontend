import navigation from 'reducers/search-page/navigation';
import {
  SEARCH_NAVIGATION_LEFT, SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_RIGHT,
  SEARCH_NAVIGATION_UP
} from 'actions/search-page';


describe('navigation reducer', function () {
  describe('SEARCH_NAVIGATION_LEFT', function () {
    it('stays in the same position if it\'s in the most-left column', function () {
      const suggestionColumns = [2, 2];

      navigation({ 'columnIndex': 0, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 0 });
    });

    it('moves to last item of the column if current item index greater than the column\'s length', function () {
      const suggestionColumns = [2, 3];

      navigation({ 'columnIndex': 1, 'itemIndex': 2 }, {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 1 });
    });

    it('moves to the next column in the same row in the normal case', function () {
      const suggestionColumns = [2, 2];

      navigation({ 'columnIndex': 1, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 0 });
    });
  });

  describe('SEARCH_NAVIGATION_DOWN', function () {
    it('stays in the same position if it\'s the last one', function () {
      const suggestionColumns = [2];

      navigation({ 'columnIndex': 0, 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 1 });
    });

    it('moves down one row in the normal case', function () {
      const suggestionColumns = [2];

      navigation({ 'columnIndex': 0, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 1 });
    });
  });

  describe('SEARCH_NAVIGATION_UP', function () {
    it('stays in the same position if it\'s the top row', function () {
      const suggestionColumns = [2];

      navigation({ 'columnIndex': 0, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 0 });
    });

    it('moves up one row in normal case', function () {
      const suggestionColumns = [2];

      navigation({ 'columnIndex': 0, 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 0, 'itemIndex': 0 });
    });
  });

  describe('SEARCH_NAVIGATION_RIGHT', function () {
    it('stays in the same position if it is in the most right column ', function () {
      const suggestionColumns = [2, 2];

      navigation({ 'columnIndex': 1, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 1, 'itemIndex': 0 });
    });

    it('moves to last item of the column if current item index greater than the column\'s length', function () {
      const suggestionColumns = [3, 2];

      navigation({ 'columnIndex': 0, 'itemIndex': 2 }, {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 1, 'itemIndex': 1 });
    });

    it('moves to right column and keeping item index in the normal case', function () {
      const suggestionColumns = [2, 2];

      navigation({ 'columnIndex': 0, 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual({ 'columnIndex': 1, 'itemIndex': 0 });
    });
  });
});
