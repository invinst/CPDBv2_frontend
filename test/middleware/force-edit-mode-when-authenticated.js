import { stub } from 'sinon';

import { PAGE_LOAD_START } from 'utils/constants';
import forceEditModeWhenAuthenticated from 'middleware/force-edit-mode-when-authenticated';
import { updatePathName } from 'actions/path-name';
import Cookies from 'js-cookie';


describe('forceEditModeWhenAuthenticated', function () {
  const createStore = (pathname) => ({
    getState: () => {
      return {
        pathname,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('success'),
  });

  it('should dispatch updatePathName when on forced page', function () {
    const pageLoadStartAction = {
      type: PAGE_LOAD_START,
    };

    const store = createStore('/document/123456/');
    stub(Cookies, 'get').withArgs('apiAccessToken').returns('abcd1234');
    forceEditModeWhenAuthenticated(store)(action => action)(pageLoadStartAction);
    store.dispatch.should.be.calledWith(updatePathName('/edit/document/123456/'));
  });

  it('should not dispatch updatePathName when not on forced page', function () {
    const pageLoadStartAction = {
      type: PAGE_LOAD_START,
    };

    const store = createStore('/officer/123456/');
    stub(Cookies, 'get').withArgs('apiAccessToken').returns('abcd1234');
    forceEditModeWhenAuthenticated(store)(action => action)(pageLoadStartAction);
    store.dispatch.should.not.be.called();
  });

  it('should not dispatch updatePathName when not authenticated', function () {
    const pageLoadStartAction = {
      type: PAGE_LOAD_START,
    };

    const store = createStore('/officer/123456/');
    stub(Cookies, 'get').withArgs('apiAccessToken').returns('');
    forceEditModeWhenAuthenticated(store)(action => action)(pageLoadStartAction);
    store.dispatch.should.not.be.called();
  });
});
