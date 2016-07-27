import { groupElements } from 'utils/collection';


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
