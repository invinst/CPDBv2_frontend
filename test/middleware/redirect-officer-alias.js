import { stub } from 'sinon';
import { reset as resetBreadcrumbs } from 'redux-breadcrumb-trail';

import redirectOfficerAliasMiddleware from 'middleware/redirect-officer-alias';
import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('redirectOfficerAliasMiddleware', function () {
  it('should redirect to correct officer if there is officer alias on OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    const store = {
      getState: () => {
        return {
          breadcrumb: {
            breadcrumbs: [
              {
                location: {
                  pathname: '/'
                },
                params: {}
              },
              {
                location: {
                  pathname: '/officer/123/'
                },
                params: {}
              }
            ]
          }
        };
      },
      dispatch: stub().usingPromise(Promise).resolves('abc')
    };

    const summaryRequestAction = {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      request: { url: '/officer/123/' },
      payload: { 'full_name': 'Peter Parker', id: 456 }
    };

    redirectOfficerAliasMiddleware(store)(action => action)(summaryRequestAction);
    store.dispatch.calledWith(resetBreadcrumbs({
      breadcrumbs: [
        {
          location: {
            pathname: '/'
          },
          params: {}
        },
        {
          location: {
            pathname: '/officer/456/peter-parker/'
          },
          params: {
            officerId: 456,
            fullName: 'peter-parker'
          },
          url: '/officer/456/peter-parker/'
        }
      ]
    })).should.be.true();
  });

  it('should convert officer id param to int on @@redux-breadcrumb-trail/PUSH', function () {
    const action = {
      type: '@@redux-breadcrumb-trail/PUSH',
      payload: {
        params: {
          officerId: '456'
        }
      }
    };
    redirectOfficerAliasMiddleware({})(action => action)(action);

    action.payload.params.officerId.should.eql(456);
  });
});
