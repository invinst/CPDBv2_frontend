import { browserHistory } from 'react-router';
import { stub } from 'sinon';

import { Toastify } from 'utils/vendors';
import toastStyles from 'utils/toast.sass';
import { showPinboardToast, showAddOrRemoveItemToast, showCreatedToasts, showInvalidParamToasts } from 'utils/toast';

describe('Toast utils', function () {
  beforeEach(function () {
    Toastify.toast.resetHistory();
  });

  afterEach(function () {
    Toastify.toast.resetHistory();
  });

  const cssTransition = Toastify.cssTransition({
    enter: 'toast-enter',
    exit: 'toast-exit',
    duration: 500,
    appendPosition: true,
  });

  describe('showPinboardToast', function () {
    it('should show a toast with provided message and pinboard toast style', function () {
      showPinboardToast('toast message');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith(
        'toast message',
        {
          className: toastStyles.pinboardPageToast,
          transition: cssTransition,
          autoClose: false,
        }
      );
    });
  });

  describe('showAddOrRemoveItemToast', function () {
    it('should show added toast if isPinned is false', function () {
      const browserHistoryPush = stub(browserHistory, 'push');

      const pinboard = { id: '123abc' };
      showAddOrRemoveItemToast(pinboard, false, 'CR');

      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('CR added');
      Toastify.toast.getCall(0).args[1]['className'].should.equal(`${toastStyles.toastWrapper} added`);
      Toastify.toast.getCall(0).args[1]['transition'].should.eql(cssTransition);
      Toastify.toast.getCall(0).args[1]['onClick']();
      browserHistoryPush.should.be.calledWith('/pinboard/123abc/untitled-pinboard/');

      browserHistoryPush.restore();
    });

    it('should show added toast if isPinned is true', function () {
      const pinboard = { id: '123abc' };

      showAddOrRemoveItemToast(pinboard, true, 'DATE > CR');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('CR removed');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(pinboard, true, 'INVESTIGATOR > CR');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('CR removed');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(pinboard, true, 'UNIT > OFFICERS');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('Officer removed');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(pinboard, true, 'TRR');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('TRR removed');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(pinboard, true, 'DATE > TRR');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('TRR removed');
    });

    it('should show toasts with correct type message', function () {
      const pinboard = { id: '123abc' };
      showAddOrRemoveItemToast(pinboard, true, 'OFFICER');

      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('Officer removed');
      Toastify.toast.getCall(0).args[1]['className'].should.equal(`${toastStyles.toastWrapper} removed`);
      Toastify.toast.getCall(0).args[1]['transition'].should.eql(cssTransition);
    });
  });

  describe('showCreatedToasts', function () {
    it('should show toasts with number of success items over not found items', function () {
      const pinboardSavingResponse = {
        id: 'abc123',
        'officer_ids': [1],
        crids: ['1053673'],
        'trr_ids': [],
        'not_found_items': {
          'officer_ids': [],
          crids: ['xyz567', 'tyu890'],
          'trr_ids': [3, 99],
        },
      };
      showCreatedToasts(pinboardSavingResponse);
      Toastify.toast.should.be.calledTwice();
      Toastify.toast.should.be.calledWith(
        '1 out of 3 allegations were added to this pinboard. ' +
        '2 out of 3 allegation IDs could not be recognized (xyz567, tyu890).',
      );
      Toastify.toast.should.be.calledWith('2 out of 2 TRR IDs could not be recognized (3, 99).');
    });
  });

  describe('showInvalidParamToasts', function () {
    it('should show correct message with on invalid param', function () {
      showInvalidParamToasts(['invalid-param']);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith('invalid-param is not recognized.');
    });

    it('should show correct message with invalid params', function () {
      showInvalidParamToasts(['invalid-param-a', 'invalid-param-b']);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith('invalid-param-a, invalid-param-b are not recognized.');
    });
  });
});
