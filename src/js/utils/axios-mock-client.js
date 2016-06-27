import MockAdapter from 'axios-mock-adapter';

import axiosClient from './axios-client';


export default new MockAdapter(axiosClient);
