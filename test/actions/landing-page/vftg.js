import {
  subscribeEmail, MAIL_CHIMP_URL, SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE
} from 'actions/landing-page/vftg';


describe('subscribeEmail action', function () {
  it('should return correct action', function () {
    subscribeEmail('abc@abc.abc').should.eql({
      types: [SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE],
      payload: {
        request: {
          url: MAIL_CHIMP_URL,
          method: 'POST',
          adapter: undefined,
          data: {
            email: 'abc@abc.abc'
          }
        }
      }
    });
  });
});
