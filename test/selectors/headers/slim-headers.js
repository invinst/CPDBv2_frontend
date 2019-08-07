import {
  getLogoSectionEditModeOn,
  getDemoVideoSectionEditModeOn,
  hasVideoInfoSelector,
  thumbnailUrlSelector,
} from 'selectors/headers/slim-header';

describe('Slim header selectors', function () {
  describe('getLogoSectionEditModeOn', function () {
    it('should return correct logo section edit mode', function () {
      getLogoSectionEditModeOn({
        headers: {
          slimHeader: {
            logoSectionEditModeOn: true
          }
        }
      }).should.be.true();

      getLogoSectionEditModeOn({
        headers: {
          slimHeader: {
            logoSectionEditModeOn: false
          }
        }
      }).should.be.false();
    });
  });

  describe('getDemoVideoSectionEditModeOn', function () {
    it('should return correct demo video section edit mode', function () {
      getDemoVideoSectionEditModeOn({
        headers: {
          slimHeader: {
            demoVideoSectionEditModeOn: true
          }
        }
      }).should.be.true();

      getDemoVideoSectionEditModeOn({
        headers: {
          slimHeader: {
            demoVideoSectionEditModeOn: false
          }
        }
      }).should.be.false();
    });
  });

  describe('hasVideoInfoSelector', function () {
    it('should return true if video info is available', function () {
      hasVideoInfoSelector({
        headers: {
          slimHeader: {
            videoInfo: [{
              id: 285002059,
              title: 'Citizens Police Data Project',
              description: 'CPDP.co is an interactive data tool built for the public.',
              url: 'https://vimeo.com/285002059',
              'upload_date': '2018-08-14 16:19:37',
              'thumbnail_small': 'https://i.vimeocdn.com/video/797111186_100x75.jpg',
              'thumbnail_medium': 'https://i.vimeocdn.com/video/797111186_200x150.jpg',
              'thumbnail_large': 'https://i.vimeocdn.com/video/797111186_640.jpg',
              'user_id': 2427482,
              'user_name': 'Invisible Institute',
              'user_url': 'https://vimeo.com/invisiblechicago',
              'user_portrait_small': 'https://i.vimeocdn.com/portrait/24927051_30x30',
              'user_portrait_medium': 'https://i.vimeocdn.com/portrait/24927051_75x75',
              'user_portrait_large': 'https://i.vimeocdn.com/portrait/24927051_100x100',
              'user_portrait_huge': 'https://i.vimeocdn.com/portrait/24927051_300x300',
              'stats_number_of_likes': 2,
              'stats_number_of_plays': 1736,
              'stats_number_of_comments': 0,
              duration: 168,
              width: 1920,
              height: 1080,
              tags: 'chicago, police',
              'embed_privacy': 'anywhere'
            }]
          }
        }
      }).should.be.true();
    });

    it('should return false if video info is not available', function () {
      hasVideoInfoSelector({
        headers: {
          slimHeader: {
            videoInfo: []
          }
        }
      }).should.be.false();
    });
  });

  describe('thumbnailUrlSelector', function () {
    it('should return thumbnail_small url if it is available', function () {
      thumbnailUrlSelector({
        headers: {
          slimHeader: {
            videoInfo: [{
              id: 285002059,
              'thumbnail_small': 'https://i.vimeocdn.com/video/797111186_100x75.jpg',
              'thumbnail_medium': 'https://i.vimeocdn.com/video/797111186_200x150.jpg',
              'thumbnail_large': 'https://i.vimeocdn.com/video/797111186_640.jpg',
            }]
          }
        }
      }).should.equal('https://i.vimeocdn.com/video/797111186_100x75.jpg');
    });

    it('should return thumbnail_medium url if thumbnail_small is missing', function () {
      thumbnailUrlSelector({
        headers: {
          slimHeader: {
            videoInfo: [{
              id: 285002059,
              'thumbnail_medium': 'https://i.vimeocdn.com/video/797111186_200x150.jpg',
              'thumbnail_large': 'https://i.vimeocdn.com/video/797111186_640.jpg',
            }]
          }
        }
      }).should.equal('https://i.vimeocdn.com/video/797111186_200x150.jpg');
    });

    it('should return thumbnail_large url if thumbnail_small and thumbnail_medium are missing', function () {
      thumbnailUrlSelector({
        headers: {
          slimHeader: {
            videoInfo: [{
              id: 285002059,
              'thumbnail_large': 'https://i.vimeocdn.com/video/797111186_640.jpg',
            }]
          }
        }
      }).should.equal('https://i.vimeocdn.com/video/797111186_640.jpg');
    });

    it('should return .png thumbnail_small url if it is .webp', function () {
      thumbnailUrlSelector({
        headers: {
          slimHeader: {
            videoInfo: [{
              id: 285002059,
              'thumbnail_small': 'https://i.vimeocdn.com/video/797111186_100x75.webp',
              'thumbnail_medium': 'https://i.vimeocdn.com/video/797111186_200x150.webp',
              'thumbnail_large': 'https://i.vimeocdn.com/video/797111186_640.webp',
            }]
          }
        }
      }).should.equal('https://i.vimeocdn.com/video/797111186_100x75.png');
    });
  });
});
