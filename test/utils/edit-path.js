import sinon from 'sinon';
import browserHistory from 'utils/history';

import * as utilsDom from 'utils/dom';
import { editMode, pushPathPreserveEditMode, editModeOn } from 'utils/edit-path';


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

  describe('pushPathPreserveEditMode', function () {
    beforeEach(function () {
      sinon.stub(browserHistory, 'push');
    });

    it('should preserve edit mode when push a new path', function () {
      sinon.stub(utilsDom, 'getCurrentPathname').callsFake(() => '/edit/officer/13/');
      pushPathPreserveEditMode('/');
      browserHistory.push.args[0][0].should.eql('/edit/');
    });

    it('should preserve non edit mode when push a new path', function () {
      sinon.stub(utilsDom, 'getCurrentPathname').callsFake(() => '/officer/13/');
      pushPathPreserveEditMode('/edit/');
      browserHistory.push.args[0][0].should.eql('/');
    });
  });

  describe('editModeOn', function () {
    it('should return true if path is /edit/...', function () {
      const path = '/edit/a';
      editModeOn(path).should.be.true();
    });

    it('should return false if path is not /edit/...', function () {
      const path = '/a';
      editModeOn(path).should.be.false();
    });
  });
});
