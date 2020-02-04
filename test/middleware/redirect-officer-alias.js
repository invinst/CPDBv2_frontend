import sinon from 'sinon';

import redirectOfficerAliasMiddleware from 'middleware/redirect-officer-alias';
import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_TAB } from 'utils/constants';
import { changeOfficerTab } from 'actions/officer-page';
import { updatePathName } from 'actions/path-name';


describe('redirectOfficerAliasMiddleware', function () {
  const createStore = (pathname) => ({
    getState: () => {
      return {
        breadcrumb: {
          breadcrumbItems: [],
        },
        pathname,
      };
    },
    dispatch: sinon.stub().usingPromise(Promise).resolves('abc'),
  });

  it('should dispatch correct actions', function () {
    const summaryRequestAction = {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      request: { url: '/officer/123/' },
      payload: { 'full_name': 'Peter Parker', id: 123 },
    };

    const mapTabStore = createStore('/officer/123/peter-parker/map/');
    redirectOfficerAliasMiddleware(mapTabStore)(action => action)(summaryRequestAction);
    mapTabStore.dispatch.should.be.calledWith(changeOfficerTab('MAP'));

    const coaccusalsTabStore = createStore('/officer/123/peter-parker/coaccusals/');
    redirectOfficerAliasMiddleware(coaccusalsTabStore)(action => action)(summaryRequestAction);
    coaccusalsTabStore.dispatch.should.be.calledWith(changeOfficerTab('COACCUSALS'));

    const documentsTabStore = createStore('/officer/123/peter-parker/documents/');
    redirectOfficerAliasMiddleware(documentsTabStore)(action => action)(summaryRequestAction);
    documentsTabStore.dispatch.should.be.calledWith(changeOfficerTab('DOCUMENTS'));

    const coaccusalsTabStoreWithoutOfficerName = createStore('/officer/123/coaccusals/');
    redirectOfficerAliasMiddleware(coaccusalsTabStoreWithoutOfficerName)(action => action)(summaryRequestAction);
    coaccusalsTabStoreWithoutOfficerName.dispatch.should.be.calledWith(changeOfficerTab('COACCUSALS'));
    coaccusalsTabStoreWithoutOfficerName.dispatch.should.be.calledWith(
      updatePathName('/officer/123/peter-parker/coaccusals/')
    );

    const documentsTabStoreWithoutOfficerName = createStore('/officer/123/documents/');
    redirectOfficerAliasMiddleware(documentsTabStoreWithoutOfficerName)(action => action)(summaryRequestAction);
    documentsTabStoreWithoutOfficerName.dispatch.should.be.calledWith(changeOfficerTab('DOCUMENTS'));
    documentsTabStoreWithoutOfficerName.dispatch.should.be.calledWith(
      updatePathName('/officer/123/peter-parker/documents/')
    );

    const documentsTabStoreWithWrongOfficerName = createStore('/officer/123/peter-/documents/');
    redirectOfficerAliasMiddleware(documentsTabStoreWithWrongOfficerName)(action => action)(summaryRequestAction);
    documentsTabStoreWithWrongOfficerName.dispatch.should.be.calledWith(changeOfficerTab('DOCUMENTS'));
    documentsTabStoreWithWrongOfficerName.dispatch.should.be.calledWith(
      updatePathName('/officer/123/peter-parker/documents/')
    );
  });

  it('shouldn\'t dispatch changeOfficerTab if no valid tabName', function () {
    const summaryRequestAction = {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      request: { url: '/officer/123/' },
      payload: { 'full_name': 'Peter Parker', id: 123 },
    };

    const storeWithoutTabName = createStore('/officer/123/peter-parker/');
    redirectOfficerAliasMiddleware(storeWithoutTabName)(action => action)(summaryRequestAction);
    storeWithoutTabName.dispatch.calledOnceWith(updatePathName('/officer/123/peter-parker/')).should.be.true();

    const storeWithWrongTabName = createStore('/officer/123/peter-parker/attachment');
    redirectOfficerAliasMiddleware(storeWithWrongTabName)(action => action)(summaryRequestAction);
    storeWithWrongTabName.dispatch.calledOnceWith(updatePathName('/officer/123/peter-parker/')).should.be.true();
  });

  it('should handle CHANGE_OFFICER_TAB action to add tab name to url', function () {
    const changeOfficeTabAction = {
      type: CHANGE_OFFICER_TAB,
      payload: 'DOCUMENTS',
    };

    const storeWithoutTabName = createStore('/officer/123/peter-parker/');
    redirectOfficerAliasMiddleware(storeWithoutTabName)(action => action)(changeOfficeTabAction);
    storeWithoutTabName.dispatch.should.be.calledWith(updatePathName('/officer/123/peter-parker/documents/'));

    const store = createStore('/officer/123/peter-parker/map/');
    redirectOfficerAliasMiddleware(store)(action => action)(changeOfficeTabAction);
    store.dispatch.should.be.calledWith(updatePathName('/officer/123/peter-parker/documents/'));
  });
});
