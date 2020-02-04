import should from 'should';

import pathname from 'reducers/pathname';
import { UPDATE_PATH_NAME } from 'utils/constants';


describe('pathname reducer', function () {
  it('should return initial state', function () {
    should.not.exist(pathname(undefined, {}));
  });

  it('should handle @@router/LOCATION_CHANGE', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: { pathname: '/some/path/' },
      },
    };

    pathname('some state', action).should.eql('/some/path/');
  });

  it('should handle UPDATE_PATH_NAME', function () {
    const action = {
      type: UPDATE_PATH_NAME,
      payload: '/some/path/',
    };

    pathname('some state', action).should.eql('/some/path/');
  });
});
