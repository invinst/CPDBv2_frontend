import { officerPath, getPathNameKey } from 'utils/paths';


describe('officerPath', function () {
  it('should return domain name', function () {
    officerPath('21860', 'Robbin Parker',).should.equal('/officer/21860/robbin-parker/');
    officerPath('21860').should.equal('/officer/21860/');
  });
});

describe('getPathNameKey', function () {
  it('should give the same key for search page and search alias page', function () {
    const searchKey = getPathNameKey('/search/');
    const searchAliasKey = getPathNameKey('/search/alias/');
    searchKey.should.equal('/search/');
    searchAliasKey.should.equal('/search/');
  });

  it('should give the same key for officer page with same officer id', function () {
    const officerKey = getPathNameKey('/officer/123/');
    const officerWithNameKey = getPathNameKey('/officer/123/edward-may');
    officerKey.should.equal('/officer/123/');
    officerWithNameKey.should.equal('/officer/123/');
  });

  it('should give the same key for pinboard page with same id', function () {
    const pinboardOldTitleKey = getPathNameKey('/pinboard/123/old-title');
    const pinboardNewTitleKey = getPathNameKey('/pinboard/123/new-title');
    pinboardOldTitleKey.should.equal('/pinboard/123/');
    pinboardNewTitleKey.should.equal('/pinboard/123/');
  });

  it('should return pathname', function () {
    const trrKey = getPathNameKey('/trr/123/');
    trrKey.should.equal('/trr/123/');
  });
});
