import { showToast } from 'actions/toast';
import * as constants from 'utils/constants';


describe('showToast action', function () {
  it('should return correct action', function () {
    showToast({
      id: '1234',
      type: 'OFFICER',
      isPinned: false,
    }).should.deepEqual({
      type: constants.SHOW_TOAST,
      payload: {
        id: '1234',
        type: 'OFFICER',
        isPinned: false,
      },
    });
  });
});
