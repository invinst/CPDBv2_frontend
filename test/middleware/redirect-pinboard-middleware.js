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
} from 'utils/constants';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
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
  const createStore = (pinboard, pathname='', toasts=[]) => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
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

                this.store.dispatch.callCount.should.equal(11);
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

                this.store.dispatch.callCount.should.equal(10);
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
});
