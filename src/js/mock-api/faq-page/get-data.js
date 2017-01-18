import FAQFactory from 'utils/test/factories/faq';


/* istanbul ignore next */
export default () => {
  const faqs = FAQFactory.buildList(20);
  return {
    'count': 20,
    'next': null,
    'previous': null,
    'results': faqs
  };
};
