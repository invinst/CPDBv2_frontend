import { each } from 'lodash';


// the strategy for this layout is not display image for image story when there not enough space
export function buildLayout(stories, grids) {
  let layouts = {};
  let position = 0;

  each(stories, (story) => {
    let isDisplayImage = !!story.imageUrl;
    let storyPosition = position;

    position += isDisplayImage ? 2 : 1;
    if (position > grids) {
      isDisplayImage = false;
    }
    if (position > grids - 1) {
      position = 0;
    }

    layouts[story.id] = {
      grids: grids,
      position: storyPosition,
      isDisplayImage: isDisplayImage
    };
  });

  return layouts;
}
