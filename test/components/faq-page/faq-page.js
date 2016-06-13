import FAQPage from 'components/faq-page/faq-page';
import configureStore from 'redux-mock-store';
import PaginationFactory from 'utils/test/factories/pagination';


const mockStore = configureStore();
const store = mockStore({
  faqPage: {
    faqs: PaginationFactory.buildList(5)
  }
});

describe('FAQPage component', function () {
  it('should be renderable', function () {
    FAQPage.should.be.renderable({ store });
  });
});
