import {
  SMALL_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE
} from 'components/common/story/story';
import { DESKTOP, TABLET } from 'utils/constants';
import { buildStoriesLayout } from 'utils/layouts/stories-page/featured-stories';


describe('buildStoriesLayout', function () {
  it('should return correct story group layout object', function () {
    const stories = [1, 2, 3];

    let results = buildStoriesLayout(stories, DESKTOP);
    results.length.should.equal(2);
    results[0].group.should.deepEqual([1]);
    results[0].storyTitleSize.should.equal(NORMAL_TITLE_STYLE);
    results[1].group.should.deepEqual([2, 3]);
    results[1].storyTitleSize.should.equal(SMALL_TITLE_STYLE);

    results = buildStoriesLayout(stories, TABLET);
    results.length.should.equal(3);
    results[0].group.should.deepEqual([1]);
    results[0].storyTitleSize.should.equal(BIG_TITLE_STYLE);
    results[1].group.should.deepEqual([2]);
    results[1].storyTitleSize.should.equal(NORMAL_TITLE_STYLE);
    results[2].group.should.deepEqual([3]);
    results[2].storyTitleSize.should.equal(BIG_TITLE_STYLE);
  });
});
