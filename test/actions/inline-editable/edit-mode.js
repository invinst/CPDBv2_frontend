import { toggleEditMode } from 'actions/inline-editable/edit-mode';


describe('toggleEditMode action', function () {
  it('should change edit path to normal path', function () {
    const pathName = '/edit/path';
    toggleEditMode(pathName).should.eql({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: { method: 'push', args: ['/path'] }
    });
  });

  it('should change normal path to edit path', function () {
    const pathName = '/path';
    toggleEditMode(pathName).should.eql({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: { method: 'push', args: ['/edit/path'] }
    });
  });
});
