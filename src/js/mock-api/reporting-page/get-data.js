import ReportFactory from 'utils/test/factories/report';


/* istanbul ignore next */
export default () => {
  const reports = ReportFactory.buildList(20);
  return {
    'count': 162,
    'next': 'http://localhost:4000/api/v2/reports/?limit=20&offset=20',
    'previous': null,
    'results': reports
  };
};
