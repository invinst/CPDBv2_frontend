import config from 'config';

/*istanbul ignore next*/
export function getMockAdapter() {
  if (config.appEnv === 'integration-test') {
    let mockApiFile = 'mock-api-base';
    const fileName = localStorage.getItem('TEST_MOCK_API_FILE');
    if (fileName)
      mockApiFile = fileName;

    const axiosMockClient = require(`./${mockApiFile}`);

    return axiosMockClient.adapter();
  }
  return null;
}
