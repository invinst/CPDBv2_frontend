import FAQFactory from 'utils/test/factories/faq';


/* istanbul ignore next */
export default () => {
  return {
    'count': 10,
    'next': null,
    'previous': null,
    'results': [
      FAQFactory.build({ id: 3 }, { question: 'Q3', answer: 'A3', order: 3 }),
      FAQFactory.build({ id: 2 }, { question: 'Q2', answer: 'A2', order: 2 }),
      FAQFactory.build({ id: 1 }, { question: 'Q1', answer: 'A1', order: 1 })
    ]
  };
};
