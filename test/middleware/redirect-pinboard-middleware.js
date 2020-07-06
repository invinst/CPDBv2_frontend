import { Promise } from 'es6-promise';
import { stub } from 'sinon';
import { CancelToken } from 'axios';

import browserHistory from 'utils/history';
import fetchAndRedirectPinboardMiddleware from 'middleware/redirect-pinboard-middleware';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  REMOVE_PINBOARD_REQUEST_SUCCESS,
} from 'utils/constants';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchComplaintSummary,
  fetchTRRSummary,
  fetchOfficersSummary,
  fetchComplainantsSummary,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
} from 'actions/pinboard';
import { updatePathName } from 'actions/path-name';


const REDIRECT_ACTION_TYPES = [
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
];

describe('redirectPinboardMiddleware', function () {
  const createStore = (pinboard, pathname='', toasts=[], pinboards=[]) => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
          pinboards,
        },
        toasts: toasts,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc'),
  });

  beforeEach(function () {
    stub(CancelToken, 'source');
    stub(browserHistory, 'replace');
    this.store = createStore();
  });

  context('on pinboard page', function () {
    context('on /pinboard/2bd40cf2/old-title/', function () {
      beforeEach(function () {
        stub(browserHistory, 'location').value({ pathname: '/pinboard/2bd40cf2/old-title/' });
      });

      REDIRECT_ACTION_TYPES.forEach(function (actionType) {
        describe(`handling ${actionType}`, function () {
          context('new pinboard id is different from id on pathname', function () {
            it('should correct pinboard pathname', function () {
              const action = {
                type: actionType,
                payload: {
                  id: '5cd06f2b',
                  title: 'New title',
                },
              };

              let dispatched;
              fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
              dispatched.should.eql(action);

              browserHistory.replace.should.be.calledOnce();
              browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/new-title/');
              this.store.dispatch.callCount.should.equal(0);
            });
          });

          context('new pinboard id is the same as id on pathname', function () {
            context('different pinboard pathname', function () {
              it('should fetch pinboard data and call updatePathname', function () {
                const action = {
                  type: actionType,
                  payload: {
                    id: '2bd40cf2',
                    title: 'New pinboard title',
                  },
                };

                let dispatched;
                fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
                dispatched.should.eql(action);

                browserHistory.replace.should.not.be.called();

                this.store.dispatch.callCount.should.equal(15);
                this.store.dispatch.should.be.calledWith(updatePathName('/pinboard/2bd40cf2/new-pinboard-title/'));
                this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(
                  fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '2bd40cf2' })
                );
                this.store.dispatch.should.be.calledWith(
                  fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '2bd40cf2' })
                );
                this.store.dispatch.should.be.calledWith(fetchComplaintSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchTRRSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchOfficersSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchComplainantsSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('2bd40cf2'));
              });
            });

            context('same pinboard pathname', function () {
              it('should fetch pinboard data and not call updatePathname', function () {
                const action = {
                  type: actionType,
                  payload: {
                    id: '2bd40cf2',
                    title: 'old title',
                  },
                };

                let dispatched;
                fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
                dispatched.should.eql(action);

                browserHistory.replace.should.not.be.called();

                this.store.dispatch.callCount.should.equal(14);
                this.store.dispatch.should.not.be.calledWith(updatePathName('/pinboard/2bd40cf2/new-pinboard-title/'));
                this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(
                  fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '2bd40cf2' })
                );
                this.store.dispatch.should.be.calledWith(
                  fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '2bd40cf2' })
                );
                this.store.dispatch.should.be.calledWith(fetchComplaintSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchTRRSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchOfficersSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchComplainantsSummary('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('2bd40cf2'));
                this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('2bd40cf2'));
              });
            });
          });
        });
      });

      describe('handling PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
        context('on pinboard page', function () {
          context('current pinboard pathname is different from new pinboard pathname', function () {
            it('should call updatePathname', function () {
              const action = {
                type: PINBOARD_UPDATE_REQUEST_SUCCESS,
                payload: {
                  id: '2bd40cf2',
                  title: 'New title',
                },
              };

              let dispatched;
              fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
              dispatched.should.eql(action);

              browserHistory.replace.should.not.be.called();
              this.store.dispatch.callCount.should.equal(1);
              this.store.dispatch.should.be.calledWith(updatePathName('/pinboard/2bd40cf2/new-title/'));
            });
          });
        });
      });
    });

    context('on /pinboard/', function () {
      beforeEach(function () {
        stub(browserHistory, 'location').value({ pathname: '/pinboard/' });
      });

      REDIRECT_ACTION_TYPES.forEach(function (actionType) {
        describe(`handling ${actionType}`, function () {
          context('new pinboard id is different from id on pathname', function () {
            it('should correct pinboard pathname', function () {
              const action = {
                type: actionType,
                payload: {
                  id: '5cd06f2b',
                  title: 'New title',
                },
              };

              let dispatched;
              fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
              dispatched.should.eql(action);

              browserHistory.replace.should.be.calledOnce();
              browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/new-title/');
              this.store.dispatch.callCount.should.equal(0);
            });
          });
        });
      });
    });
  });

  context('not on pinboard page', function () {
    beforeEach(function () {
      stub(browserHistory, 'location').value({ pathname: '/search/' });
    });
    REDIRECT_ACTION_TYPES.forEach(function (actionType) {
      describe(`handling ${actionType}`, function () {
        it('should do nothing', function () {
          stub(browserHistory, 'location').value({ pathname: '/search/' });

          const action = {
            type: actionType,
            payload: {
              id: '5cd06f2b',
              title: 'Old title',
            },
          };

          let dispatched;
          fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          browserHistory.replace.should.not.be.called();
          this.store.dispatch.should.not.be.called();
        });
      });
    });
  });

  describe('handling REMOVE_PINBOARD_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'push');
    });

    context('remove current pinboard', function () {
      let action;
      beforeEach(function () {
        action = {
          type: REMOVE_PINBOARD_REQUEST_SUCCESS,
          request: { url: 'http://localhost:8000/api/v2/mobile/pinboards/ab72f2/' },
        };
      });

      context('current pinboard is last pinboard', function () {
        it('should redirect to /pinboard/', function () {
          const store = createStore({ id: 'ab72f2' }
            , '',
            [],
            []
          );
          let dispatched;

          fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          browserHistory.push.should.be.calledOnce();
          browserHistory.push.should.be.calledWith('/pinboard/');
          browserHistory.replace.should.not.be.called();
        });
      });

      context('current pinboard is not last pinboard', function () {
        it('should redirect to most recent viewed pinboard', function () {
          const store = createStore({ id: 'ab72f2' }
            , '',
            [],
            [{ id: '63f12b', title: 'Recent Pinboard' }, { id: 'ab23f7', title: 'Other pinboard' }]
          );
          let dispatched;

          fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          browserHistory.push.should.be.calledOnce();
          browserHistory.push.should.be.calledWith('/pinboard/63f12b/recent-pinboard/');
          browserHistory.replace.should.not.be.called();
        });
      });
    });

    context('remove not current pinboard', function () {
      it('should no redirect', function () {
        const store = createStore({ id: 'ab72f2' }
          , '',
          [],
          [{ id: 'ac12f9' }, { id: '123f98' }, { id: '35ac4f' }]
        );
        const action = {
          type: REMOVE_PINBOARD_REQUEST_SUCCESS,
          request: { url: 'http://localhost:8000/api/v2/mobile/pinboards/ac12f9/' },
        };
        let dispatched;
        fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);

        browserHistory.push.should.not.be.called();
        browserHistory.replace.should.not.be.called();
      });
    });
  });
});
