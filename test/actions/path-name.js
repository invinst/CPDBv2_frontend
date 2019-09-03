import { updatePathName } from 'actions/path-name';
import { UPDATE_PATH_NAME } from 'utils/constants';


describe('Path name actions', function () {
  describe('updatePathName', function () {
    it('should return correct payload', function () {
      updatePathName('/some/path').should.eql({
        type: UPDATE_PATH_NAME,
        payload: '/some/path',
      });
    });
  });
});
