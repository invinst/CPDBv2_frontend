import docOverviewPageReducer from 'reducers/documents-overview-page';


describe('Documents overview page reducer', function () {
  it('should have initial state', function () {
    docOverviewPageReducer(undefined, {}).should.deepEqual({
      documents: {},
      pagination: {},
      documentsOrder: [],
    });
  });
});
