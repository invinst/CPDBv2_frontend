import { editRouterPath } from 'utils/router-path';

describe('editRouterPath', function () {
  it('should return correct path', function () {
    editRouterPath('/search').should.eql('/(edit)?/search');
  });
});
