import { getPaginationInfo } from 'selectors/common/pagination-selector';


describe('getPaginationInfo', function () {
  it('should return pagination info', function () {
    const next = 'next';
    const previous = 'previous';
    const count = 'count';

    const paginator = { next, previous, count };

    getPaginationInfo(paginator).should.eql({ next, previous, count });
  });
});
