import docDedupPageReducer from 'reducers/document-deduplicator-page';


describe('Document deduplicator page reducer', function () {
  it('should have initial state', function () {
    docDedupPageReducer(undefined, {}).should.deepEqual({
      documents: {
        data: {},
        crid: '',
      },
      documentsOrder: {
        data: [],
        crid: '',
      },
      pagination: {},
    });
  });
});
