import { editMode } from 'utils/edit-path';


describe('EditPath utils', function () {
  describe('editMode', function () {
    it('should return correct edit path', function () {
      editMode('/').should.equal('/edit/');
      editMode('').should.equal('/edit/');
      editMode('/edit').should.equal('/edit/');
      editMode('/edit/').should.equal('/edit/');

      editMode('/edit/aaaa/').should.equal('/edit/aaaa/');
      editMode('/aaaa').should.equal('/edit/aaaa');
      editMode('aaaa').should.equal('/edit/aaaa');
    });
  });
});
