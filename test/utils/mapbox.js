import { getComplaintMapUrl, getLawsuitMapUrl } from 'utils/mapbox';


describe('getComplaintMapUrl', function () {
  it('should return query correct mapbox url for complaint map', function () {
    getComplaintMapUrl(41.7924183, -87.668458, 130, 176).should.eql(
      'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/'+
      'url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%2Fassets%2Fmap-marker.png' +
      '(-87.668458,41.7924183)/-87.668458,41.7924183,12,0,0/130x176@2x?access_token' +
      '=pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGpl' +
      'NHMifQ.ky2VSGEYU5KritRMArHY-w'
    );
  });

  it('should return query correct mapbox url for lawsuit map', function () {
    getLawsuitMapUrl(41.7924183, -87.668458, 130, 176).should.eql(
      'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/'+
      'url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%2Fassets%2Fmap-marker.png' +
      '(-87.668458,41.7924183)/-87.668458,41.7924183,10,0,0/130x176@2x?access_token' +
      '=pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGpl' +
      'NHMifQ.ky2VSGEYU5KritRMArHY-w'
    );
  });
});
