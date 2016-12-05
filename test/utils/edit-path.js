import { stub } from 'sinon';
import { browserHistory } from 'react-router';

import * as utilsDom from 'utils/dom';
import { editMode, pushPathPreserveEditMode } from 'utils/edit-path';


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
      stub(browserHistory, 'push');
    });

    afterEach(function () {
      browserHistory.push.restore();
    });

    it('should preserve edit mode when push a new path', function () {
      stub(utilsDom, 'getCurrentPathname', () => '/edit/reporting/13/');
      pushPathPreserveEditMode('/');
      browserHistory.push.args[0][0].should.eql('/edit/');
      utilsDom.getCurrentPathname.restore();
    });

    it('should preserve non edit mode when push a new path', function () {
      stub(utilsDom, 'getCurrentPathname', () => '/reporting/13/');
      pushPathPreserveEditMode('/edit/reporting/');
      browserHistory.push.args[0][0].should.eql('/reporting/');
      utilsDom.getCurrentPathname.restore();
    });
  });
});
