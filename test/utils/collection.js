import { groupElements, moveFromIndexToIndex } from 'utils/collection';


describe('groupElements', function () {
  it('should group elements with correct size', function () {
    const arr = [1, 2, 3, 4, 5, 6];
    const sizes = [3, 1, 2];
    const expectedResult = [[1, 2, 3], [4], [5, 6]];

    groupElements(arr, sizes).should.deepEqual(expectedResult);
  });

  it('should ignore extra elements if arr length is larger than total size', function () {
    const arr = [1, 2, 3, 4, 5, 6];
    const sizes = [3, 1];
    const expectedResult = [[1, 2, 3], [4]];

    groupElements(arr, sizes).should.deepEqual(expectedResult);
  });
});

describe('moveFromIndexToIndex', function () {
  it('should move element index within array', function () {
    const arr = [1, 2, 3, 4, 5];
    moveFromIndexToIndex(arr, 1, 3).should.deepEqual([1, 3, 4, 2, 5]);
    moveFromIndexToIndex(arr, 0, 4).should.deepEqual([2, 3, 4, 5, 1]);
    moveFromIndexToIndex(arr, 4, 0).should.deepEqual([5, 1, 2, 3, 4]);
  });
});
