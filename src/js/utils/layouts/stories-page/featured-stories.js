import { zip } from 'lodash';

import {
  SMALL_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, EXTRA_BIG_TITLE_STYLE, ULTRA_BIG_TITLE_STYLE
} from 'components/common/story/story';
import { groupElements } from 'utils/collection';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


let storyTitleSizes = {
  [TABLET]: [
    BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE,
    NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, ULTRA_BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, NORMAL_TITLE_STYLE,
    BIG_TITLE_STYLE, BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, NORMAL_TITLE_STYLE
  ],
  [DESKTOP]: [
    NORMAL_TITLE_STYLE, SMALL_TITLE_STYLE, NORMAL_TITLE_STYLE, NORMAL_TITLE_STYLE, SMALL_TITLE_STYLE,
    NORMAL_TITLE_STYLE, NORMAL_TITLE_STYLE, EXTRA_BIG_TITLE_STYLE, EXTRA_BIG_TITLE_STYLE, BIG_TITLE_STYLE,
    NORMAL_TITLE_STYLE
  ],
  [EXTRA_WIDE]: [
    BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, BIG_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE,
    BIG_TITLE_STYLE, ULTRA_BIG_TITLE_STYLE, ULTRA_BIG_TITLE_STYLE, EXTRA_BIG_TITLE_STYLE, BIG_TITLE_STYLE
  ]
};

let groupSizes = {
  [TABLET]: Array.apply(null, Array(15)).map(Number.prototype.valueOf, 1),
  [DESKTOP]: [1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1],
  [EXTRA_WIDE]: [1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1]
};

// static layout for stories page
export function buildStoriesLayout(stories, screen) {
  let groups = groupElements(stories, groupSizes[screen]);
  let layoutGroups = zip(groups, storyTitleSizes[screen]);
  layoutGroups = layoutGroups.slice(0, groups.length).map((group, ind) => {
    return {
      ind: ind,
      group: group[0],
      storyTitleSize: group[1]
    };
  });

  return layoutGroups.slice(0, groups.length);
}
