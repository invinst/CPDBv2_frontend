import { hasEnoughRadarChartData } from 'utils/radar-chart';


describe('hasEnoughRadarChartData', () => {
  it('should return false if items is empty', () => {
    hasEnoughRadarChartData([]).should.be.false();
    hasEnoughRadarChartData(undefined).should.be.false();
  });

  it('should return false if some item value is missing', () => {
    hasEnoughRadarChartData([
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: NaN },
    ]).should.be.false();
  });

  it('should return true if all item values is OK', () => {
    hasEnoughRadarChartData([
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 10 },
    ]).should.be.true();
  });
});
