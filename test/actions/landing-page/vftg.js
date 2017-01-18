import {
  subscribeEmail, SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE
} from 'actions/landing-page/vftg';
import { MAIL_CHIMP_URL } from 'utils/constants';


describe('subscribeEmail action', function () {
  it('should return correct action', function () {
    subscribeEmail('abc@abc.abc').should.eql({
      types: [SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE],
      payload: {
        request: {
          url: MAIL_CHIMP_URL,
          method: 'post',
          adapter: null,
          data: {
            email: 'abc@abc.abc'
          }
        }
      }
    });
  });
});
