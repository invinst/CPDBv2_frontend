import FAQPage from 'components/faq-page/faq-page';
import configureStore from 'redux-mock-store';
import { PAGINATION_DEFAULT } from 'utils/constants';


const mockStore = configureStore();
const store = mockStore({
  faqPage: {
    faqs: PAGINATION_DEFAULT
  }
});

describe('FAQPage component', function () {
  it('should be renderable', function () {
    FAQPage.should.be.renderable({ store });
  });
});
