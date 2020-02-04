import { Promise } from 'es6-promise';
import sinon from 'sinon';
import { merge } from 'lodash';

import { loadPaginatedData } from 'utils/load-paginated-data';


describe('loadPaginatedData utils', function () {
  it('should fetch multiple pages', function (done) {
    const params = { 'id': 1 };
    const firstRequestFuncStub = sinon.stub().usingPromise(Promise).resolves(
      { payload: { count: 160, limit: 50 }, request: { params: params } }
    );
    const otherRequestFuncStub = sinon.stub();

    loadPaginatedData(params, firstRequestFuncStub, otherRequestFuncStub);

    firstRequestFuncStub.should.be.calledWith(params);
    setTimeout(() => {
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 50 }, params));
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 100 }, params));
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 150 }, params));
      done();
    }, 50);
  });

  it('should fetch multiple pages with store', function (done) {
    const params = { 'id': 1 };
    const firstCallPromise = Promise.resolve({ payload: { count: 160, limit: 50 }, request: { params: params } });
    const store = { dispatch: sinon.stub().onFirstCall().returns(firstCallPromise) };

    const firstRequestFuncStub = sinon.stub();
    const otherRequestFuncStub = sinon.stub();
    loadPaginatedData(params, firstRequestFuncStub, otherRequestFuncStub, store);

    firstRequestFuncStub.should.be.calledWith(params);
    setTimeout(() => {
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 50 }, params));
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 100 }, params));
      otherRequestFuncStub.should.be.calledWith(merge({ limit: 50, offset: 150 }, params));
      done();
    }, 50);
  });
});
