import { getToast } from 'selectors/toast';


describe('Toast selectors', function () {
  describe('getToast', function () {
    it('should return toast with correct format', function () {
      getToast({ toast: { isPinned: false, type: 'CR' } }).should.eql({
        actionType: 'added',
        type: 'CR'
      });

      getToast({ toast: { isPinned: true, type: 'CR' } }).should.eql({
        actionType: 'removed',
        type: 'CR'
      });

      getToast({ toast: { isPinned: false, type: 'UNIT > OFFICERS' } }).should.eql({
        actionType: 'added',
        type: 'Officer'
      });
    });
  });
});
