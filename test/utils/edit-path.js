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

    // it('should return offset key from ancestor', function () {
    //   const div = document.createElement('DIV');
    //   div.setAttribute('data-offset-key', '123');
    //   const div2 = document.createElement('DIV');
    //   div.appendChild(div2);
    //   getOffsetKey(div2).should.eql('123');
    // });
  });
});
