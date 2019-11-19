import config from 'config';

let mockApiFile = 'mock-api-base';
const fileName = localStorage.getItem('TEST_MOCK_API_FILE');
if (fileName)
  mockApiFile = fileName;

const axiosMockClient = require(`./${mockApiFile}`);

/*istanbul ignore next*/
export function getMockAdapter() {
  if (config.appEnv === 'live-test') {
    return axiosMockClient.adapter();
  }
  return null;
}
