import { getPathname } from 'selectors/common/pathname';


describe('getPathname', function () {
  it('should return pathname', function () {
    const state = {
      pathname: '/some/path/'
    };
    getPathname(state).should.eql('/some/path/');
  });
});
