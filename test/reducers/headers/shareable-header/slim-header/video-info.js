import videoInfo from 'reducers/headers/slim-header/video-info';

import { VIDEO_INFO_REQUEST_SUCCESS } from 'utils/constants';


describe('videoInfo reducer', function () {
  it('should have initial state', function () {
    videoInfo(undefined, {}).should.eql([]);
  });

  it('should handle VIDEO_INFO_REQUEST_SUCCESS', function () {
    videoInfo([], {
      type: VIDEO_INFO_REQUEST_SUCCESS,
      payload: [{
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
    }).should.eql(
      [{
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
    );
  });
});
