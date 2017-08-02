# Axios mock client development guide

## Introduction

This is a simple wrapper that use [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) to mock api request.

## Usage

Define status code and returned data in case of success:

```javascript
import axiosClient from 'utils/axios-client';
import axiosMockClient from 'utils/axios-mock-client';

axiosMockClient
  .onGet('/stories')
  .reply(200, { stories: [1, 2, 3] });

axiosClient.get('/stories').then(res => {
  console.log(res.data); // {stories: [1, 2, 3]}
  console.log(res.status); // 200
})
```
>**Note:** When you writing test using `axios-mock-client` remember to add this into your test case:
```javascript
afterEach(function () {
  axiosMockClient.reset();
});

after(function () {
  axiosMockClient.restore();
});
```
