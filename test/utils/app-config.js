import appConfig from 'utils/app-config';


describe('appConfig', function () {
  describe('set and get', function () {
    it('should update and return value correctly', function () {
      appConfig.set({
        test: [
          { value: 'test1' },
          { value: 'test2' },
        ],
      });
      appConfig.get('test').should.eql([
        { value: 'test1' },
        { value: 'test2' },
      ]);
    });
  });

  describe('isEmpty', function () {
    it('should return correct value', function () {
      appConfig.clear();
      appConfig.isEmpty().should.be.true();
      appConfig.set({
        test: [],
      });
      appConfig.isEmpty().should.be.false();
    });
  });
});
