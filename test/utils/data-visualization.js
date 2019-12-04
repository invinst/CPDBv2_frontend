import { getDataVisualizationTabName } from 'utils/data-visualization';


describe('data visualization utils', function () {
  describe('getDataVisualizationTabName', function () {
    it('should return empty string if pathname is not matched', function () {
      getDataVisualizationTabName('').should.be.equal('');
      getDataVisualizationTabName('social-graph/').should.be.equal('');
      getDataVisualizationTabName('/geography/').should.be.equal('');
    });

    it('should return the correct visualization tab name if pathname is matched', function () {
      getDataVisualizationTabName('/social-graph/pinboard/1234abcd/').should.be.equal('SOCIAL_GRAPH');
      getDataVisualizationTabName('/geographic/?unit_id=123').should.be.equal('GEOGRAPHIC');
    });
  });
});
