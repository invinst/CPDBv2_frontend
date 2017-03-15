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

  it('should prepend search path when receive officer path if stack was empty', function () {
    pathStackReducer([], locationChange('/officer/205/'))
      .should.eql(['/search/', '/officer/205/']);

    pathStackReducer([], locationChange('/officer/205/timeline/'))
      .should.eql(['/search/', '/officer/205/timeline/']);

    pathStackReducer([], locationChange('/edit/officer/205/timeline/'))
      .should.eql(['/search/', '/officer/205/timeline/']);

    pathStackReducer(['/abc/'], locationChange('/officer/205/'))
      .should.eql(['/abc/', '/officer/205/']);
  });

  it('should refresh stack when received non bottom sheet path', function () {
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

  it('should handle pop back from regular page to bottom sheet', function () {
    pathStackReducer(['/abc/'], locationChange('/officer/123/', true)).should.eql(['/abc/', '/officer/123/']);
  });

  it('should handle other pop back cases', function () {
    pathStackReducer(['abc', 'xyz'], locationChange('abc', true)).should.eql(['abc']);
    pathStackReducer(['/abc/', '/officer/123/timeline/'], locationChange('/officer/123/', true))
      .should.eql(['/abc/', '/officer/123/']);
    pathStackReducer(['/officer/456/', '/officer/123/timeline/'], locationChange('/officer/456/', true))
      .should.eql(['/officer/456/']);
  });

  it('should prepend bottom sheet path on first visit', function () {
    pathStackReducer([], locationChange('/officer/123/', true)).should.eql(['/search/', '/officer/123/']);
    pathStackReducer([], locationChange('/reporting/123/', true)).should.eql(['/reporting/', '/reporting/123/']);
    pathStackReducer([], locationChange('/faq/123/', true)).should.eql(['/faq/', '/faq/123/']);
  });

  it('should handle backward action', function () {
    pathStackReducer(['/reporting/', '/reporting/123/', '/officer/123/'], locationChange('/reporting/123/', true))
      .should.eql(['/reporting/', '/reporting/123/']);
  });

  it ('should handle forward action', function () {
    pathStackReducer(['/reporting/', '/reporting/123/'], locationChange('/officer/123/', true))
      .should.eql(['/reporting/', '/reporting/123/', '/officer/123/']);
  });
});
