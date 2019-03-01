import { getDemographicString } from 'utils/victims';


describe('getDemographicString', function () {
  it('should return demographic string', function () {
    getDemographicString({ race: 'White', gender: 'Male', age: 40 }).should.equal('White, Male, Age 40');
    getDemographicString({ race: 'White', gender: 'Male' }).should.equal('White, Male');
  });
});
