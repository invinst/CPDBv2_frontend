import axiosMockClient from 'utils/axios-mock-client';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';
import { clientConfig } from 'utils/axios-client';


const stories = [
  {
    id: 1,
    title: 'title 1',
    newspaper: {
      id: 1,
      name: 'newspaper name 1',
      'short_name': 'newspaper short name 1'
    },
    body: [
      { type: 'paragraph', value: 'body paragraph 1' },
      { type: 'paragraph', value: 'body paragraph 2' }
    ],
    'post_date': '1/1/1',
    'image_url': {
      [DEFAULT_IMAGE_DIMENSION]: 'image url 1'
    }
  },
  {
    id: 2,
    title: 'title 2',
    newspaper: {
      id: 2,
      name: 'newspaper name 2',
      'short_name': 'newspaper short name 2'
    },
    body: [
      { type: 'paragraph', value: 'body paragraph 1' },
      { type: 'paragraph', value: 'body paragraph 2' }
    ],
    'post_date': '2/2/2',
    'image_url': {
      [DEFAULT_IMAGE_DIMENSION]: 'image url 2'
    }
  },
  {
    id: 3,
    title: 'title 3',
    newspaper: {
      id: 3,
      name: 'newspaper name 3',
      'short_name': 'newspaper short name 3'
    },
    body: [
      { type: 'paragraph', value: 'body paragraph 1' },
      { type: 'paragraph', value: 'body paragraph 2' }
    ],
    'post_date': '3/3/3',
    'image_url': {
      [DEFAULT_IMAGE_DIMENSION]: 'image url 3'
    }
  }
];

axiosMockClient.onGet(`${clientConfig.baseURL}stories/`).reply(200, stories);

export function getMockAdapter() {
  if (LIVE_TEST !== undefined) {
    return axiosMockClient.adapter();
  }
  return null;
}
