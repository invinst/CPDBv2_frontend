const request = require('request');
const _ = require('lodash');
require('should');


const baseUrl = `http://${process.env.FRONTEND_DOMAIN}`;
const mobileAgentStr = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 ',
  '(KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
].join('');


describe('nginx config', () => {
  const empty = { expectHeadersNotPresent: [], headers: {}, expectedHeaders: {} };

  const preventIframe = path => Object.assign({}, empty, {
    path,
    expectedCode: 200,
    title: `prevent rendering ${path} in iframe`,
    expectedHeaders: { 'x-frame-options': 'SAMEORIGIN' }
  });

  const allowIframe = path => Object.assign({}, empty, {
    path,
    expectedCode: 200,
    title: `allow rendering ${path} in iframe`,
    expectHeadersNotPresent: ['x-frame-options']
  });

  const mobileRedirect = path => Object.assign({}, empty, {
    path,
    headers: {
      'user-agent': mobileAgentStr
    },
    expectedCode: 301,
    title: `mobile redirect for ${path}`,
    expectedHeaders: { 'location': `https://${process.env.MOBILE_SERVER_NAME}${path}` }
  });

  const mobileNotRedirect = path => Object.assign({}, empty, {
    path,
    headers: {
      'user-agent': mobileAgentStr
    },
    expectedCode: 200,
    title: `mobile not redirect for ${path}`,
    expectHeadersNotPresent: ['location']
  });

  const redirect = (path, toPath) => Object.assign({}, empty, {
    path,
    title: `redirect from ${path} to ${toPath}`,
    expectedCode: 301,
    expectedHeaders: { 'location': `http://${process.env.FRONTEND_DOMAIN}${toPath}` }
  });

  const testCases = [
    preventIframe('/'),
    preventIframe('/officer/123/jerome-finnigan'),
    preventIframe('/cr/123/'),
    preventIframe('/trr/123/'),
    allowIframe('/embed/map/'),
    allowIframe('/embed/top-officers-page/'),
    mobileRedirect('/'),
    mobileRedirect('/officer/123/jerome-finnigan'),
    mobileRedirect('/cr/123/'),
    mobileRedirect('/trr/123/'),
    mobileNotRedirect('/embed/map/'),
    mobileRedirect('/embed/top-officers-page/'),
    mobileNotRedirect('/fonts/Minion_Pro_Regular.ttf'),
    mobileNotRedirect('/img/arrow.svg'),
    redirect('/officer/robbin-parker/21860', '/officer/21860/robbin-parker/'),
    redirect('/officer/robbin-parker/21860/', '/officer/21860/robbin-parker/')
  ];

  const func = testCase => done => {
    request({
      followRedirect: false,
      url: `${baseUrl}${testCase.path}`,
      headers: testCase.headers
    }, (error, response, body) => {
      response.statusCode.should.eql(testCase.expectedCode);
      for (let pair of _.toPairs(testCase.expectedHeaders)) {
        const [header, value] = pair;
        response.headers[header].should.eql(value);
      }
      for (let header of testCase.expectHeadersNotPresent) {
        response.headers.should.not.have.keys(header);
      }
      done();
    });
  };

  for (let testCase of testCases) {
    it(testCase.title, func(testCase));
  }
});
