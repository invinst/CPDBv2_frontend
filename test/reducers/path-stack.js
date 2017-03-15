import pathStackReducer from 'reducers/path-stack';


const locationChange = (path, pop=false) => ({
  type: '@@router/LOCATION_CHANGE',
  payload: {
    pathname: path,
    action: pop ? 'POP' : 'PUSH'
  }
});

describe('pathStackReducer', function () {
  it('should return initial state', function () {
    pathStackReducer(undefined, {}).should.eql([]);
  });

  it('should push new non-bottom-sheet path onto stack', function () {
    pathStackReducer([], locationChange('/abc/')).should.eql(['/abc/']);
  });

  it('should not store edit mode', function () {
    pathStackReducer([], locationChange('/edit/')).should.eql(['/']);
    pathStackReducer([], locationChange('/edit/abc/')).should.eql(['/abc/']);
    pathStackReducer([], locationChange('/abcedit/')).should.eql(['/abcedit/']);
    pathStackReducer([], locationChange('/def/edit/')).should.eql(['/def/edit/']);
    pathStackReducer([], locationChange('/def/edit/abc/')).should.eql(['/def/edit/abc/']);
  });

  it('should refresh stack when received non bottom sheet path', function () {
    pathStackReducer(['/reporting/', '/reporting/123/'], locationChange('/abc/')).should.eql(['/abc/']);
  });

  it('should prepend bottom sheet base path when receive bottom sheet path', function () {
    pathStackReducer([], locationChange('/reporting/123/')).should.eql(['/reporting/', '/reporting/123/']);
    pathStackReducer([], locationChange('/faq/123/')).should.eql(['/faq/', '/faq/123/']);
    pathStackReducer([], locationChange('/officer/123/')).should.eql(['/search/', '/officer/123/']);
  });

  it('should replace current bottom sheet path when receive new bottom sheet path', function () {
    pathStackReducer(['/reporting/123/'], locationChange('/officer/123/')).should.eql(['/officer/123/']);
    pathStackReducer(['/reporting/123/'], locationChange('/faq/123/')).should.eql(['/faq/123/']);
    pathStackReducer(['/faq/123/'], locationChange('/reporting/123/')).should.eql(['/reporting/123/']);
    pathStackReducer(['/faq/123/'], locationChange('/officer/123/')).should.eql(['/officer/123/']);
    pathStackReducer(['/officer/123/'], locationChange('/faq/123/')).should.eql(['/faq/123/']);
    pathStackReducer(['/officer/123/'], locationChange('/reporting/123/')).should.eql(['/reporting/123/']);
  });

  it('should push top of non-bottom-sheet path when receive new bottom sheet path', function () {
    pathStackReducer(['/abc/'], locationChange('/reporting/123/')).should.eql(['/abc/', '/reporting/123/']);
    pathStackReducer(['/abc/'], locationChange('/faq/123/')).should.eql(['/abc/', '/faq/123/']);
    pathStackReducer(['/abc/'], locationChange('/officer/123/')).should.eql(['/abc/', '/officer/123/']);
  });
});
