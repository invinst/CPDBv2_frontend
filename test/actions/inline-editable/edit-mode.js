import { toggleEditMode } from 'actions/inline-editable/edit-mode';


describe('toggleEditMode action', function () {
  it('should return correct action', function () {
    const pathName = '/edit/path';
    toggleEditMode(pathName).should.eql({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: { method: 'push', args: ['/path'] }
    });
  });
});
