import { hasDemographicData, demographicDataTransform } from 'selectors/pinboard-page/widgets/common';


describe('widgets common selectors', function () {
  const race = [
    { race: 'Black', percentage: 0.67 },
    { race: 'Other', percentage: 0.14 },
  ];

  const gender = [
    { gender: '', percentage: 0.49 },
    { gender: 'M', percentage: 0.47 },
  ];

  describe('hasDemographicData', function () {
    context('requesting is true', function () {
      it('should return true', function () {
        hasDemographicData(true, { race: [], gender }).should.be.true();
        hasDemographicData(true, { race, gender: [] }).should.be.true();
        hasDemographicData(true, { race: [], gender: [] }).should.be.true();
        hasDemographicData(true, { race, gender }).should.be.true();
      });
    });

    context('requesting is false', function () {
      context('demographic data is empty', function () {
        it('should return false', function () {
          hasDemographicData(false, { race: [], gender: [] }).should.be.false();
        });
      });

      context('demographic data is not empty', function () {
        it('should return true', function () {
          hasDemographicData(false, { race: [], gender }).should.be.true();
          hasDemographicData(false, { race, gender: [] }).should.be.true();
          hasDemographicData(false, { race, gender }).should.be.true();
        });
      });
    });
  });

  describe('demographicDataTransform', function () {
    context('demographic data is empty', function () {
      it('should return correct value', function () {
        demographicDataTransform({}).should.eql({
          race: [],
          gender: [],
        });
      });
    });

    context('demographic data is not empty', function () {
      it('should return correct value', function () {
        demographicDataTransform({
          race,
          gender,
        }).should.eql({
          race: [
            { name: 'Black', percentage: 0.67 },
            { name: 'Other', percentage: 0.14 },
          ],
          gender: [
            { name: 'Unknown', percentage: 0.49 },
            { name: 'M', percentage: 0.47 },
          ],
        });
      });
    });
  });
});
