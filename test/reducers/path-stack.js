import pathStackReducer from 'reducers/path-stack';


const locationChange = path => ({
  type: '@@router/LOCATION_CHANGE',
  payload: {
    pathname: path
  }
});

describe('pathStackReducer', function () {
  it('should return initial state', function () {
    pathStackReducer(undefined, {}).should.eql([]);
  });

  it('should push new path onto stack', function () {
    pathStackReducer([], locationChange('/abc/')).should.eql(['/abc/']);
  });

  it('should push officer path on top of reporting path', function () {
    pathStackReducer(['/reporting/123/'], locationChange('/officer/4567/'))
      .should.eql(['/reporting/123/', '/officer/4567/']);
  });

  it('should update top path if its the same officer', function () {
    pathStackReducer(['/officer/1234/'], locationChange('/officer/1234/timeline/'))
      .should.eql(['/officer/1234/timeline/']);

    pathStackReducer(['/officer/1234/timeline/'], locationChange('/officer/1234/'))
      .should.eql(['/officer/1234/']);
  });

  it('should push another officer on top of old officer', function () {
    pathStackReducer(['/officer/1234/'], locationChange('/officer/5678/'))
      .should.eql(['/officer/1234/', '/officer/5678/']);
  });

  it('should prepend reporting path when receive report path if stack was empty', function () {
    pathStackReducer([], locationChange('/reporting/205/'))
      .should.eql(['/reporting/', '/reporting/205/']);

    pathStackReducer([], locationChange('/edit/reporting/205/'))
      .should.eql(['/reporting/', '/reporting/205/']);

    pathStackReducer(['/abc/'], locationChange('/reporting/205/'))
      .should.eql(['/abc/', '/reporting/205/']);
  });

  it('should prepend faq list path when receive faq path if stack was empty', function () {
    pathStackReducer([], locationChange('/faq/205/'))
      .should.eql(['/faq/', '/faq/205/']);

    pathStackReducer([], locationChange('/edit/faq/205/'))
      .should.eql(['/faq/', '/faq/205/']);

    pathStackReducer(['/abc/'], locationChange('/faq/205/'))
      .should.eql(['/abc/', '/faq/205/']);
  });

  it('should not push the same reporting path on top of each other', function () {
    pathStackReducer(['/def/'], locationChange('/def/')).should.eql(['/def/']);
    pathStackReducer(['/def/'], locationChange('/edit/def/')).should.eql(['/def/']);
  });

  it('should not store edit mode', function () {
    pathStackReducer([], locationChange('/edit/')).should.eql(['/']);
    pathStackReducer([], locationChange('/edit/abc/')).should.eql(['/abc/']);
    pathStackReducer([], locationChange('/abcedit/')).should.eql(['/abcedit/']);
    pathStackReducer([], locationChange('/def/edit/')).should.eql(['/def/edit/']);
    pathStackReducer([], locationChange('/def/edit/abc/')).should.eql(['/def/edit/abc/']);
  });
});
