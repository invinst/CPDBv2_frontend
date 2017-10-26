import headerBackLink from 'reducers/header-back-link';


describe('headerBackLink', function () {
  it('should return initial state', function () {
    headerBackLink(undefined, {}).should.eql('/');
  });

  it('should update when location changes to a whitelisted one', function () {
    const prevState = '/';
    const action = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/search/' } };
    headerBackLink(prevState, action).should.eql('/search/');
  });

  it('should NOT update when location changes to a non-whitelisted one', function () {
    const prevState = '/';
    const action = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/officer/' } };
    headerBackLink(prevState, action).should.eql('/');
  });

  it('should update correctly when in edit mode too', function () {
    const prevState = '/';
    const action = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/edit/search/' } };
    headerBackLink(prevState, action).should.eql('/edit/search/');
  });
});
