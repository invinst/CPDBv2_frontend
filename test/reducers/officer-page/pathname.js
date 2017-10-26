import should from 'should';

import pathname from 'reducers/officer-page/pathname';


describe('pathname reducer', function () {
  it('should return initial state', function () {
    should.not.exist(pathname(undefined, {}));
  });

  it('should handle @@router/LOCATION_CHANGE', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/some/path/'
      }
    };

    pathname('some state', action).should.eql('/some/path/');
  });
});
