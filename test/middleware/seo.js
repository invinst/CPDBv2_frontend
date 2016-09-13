import seoMiddleware from 'middleware/seo';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


describe('seoMiddleware', function () {
  const headEl = document.getElementsByTagName('HEAD')[0];

  it('should change page title and meta description', function () {
    let dispatched;
    const dispatchAction = {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        'page_title': 'abc',
        'description': 'def'
      }
    };
    seoMiddleware({})(action => dispatched = action)(dispatchAction);

    // description should change
    const el = document.evaluate(
      '//meta[@name="description"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    el.getAttribute('content').should.equal('def');
    headEl.removeChild(el);

    document.title.should.equal('abc');

    dispatched.should.eql(dispatchAction);
  });
});
