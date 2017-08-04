# Selector Development Guide

## Introduction

Selectors serve 2 purposes: further remove non-UI logic from component and only induce re-render when relevant data change. You can only use [reselect](https://github.com/reactjs/reselect) to create selectors.

## Example

- Featured Story selector:
```javascript
import { createSelector } from 'reselect';


const getStories = state => state.storyApp.stories;
const getFeaturedStoryId = state => state.storyApp.featuredStoryId;

export const featuredStorySelector = createSelector(
  getStories,
  getFeaturedStoryId,
  (stories, featuredStoryId) => {
    let featuredStory = stories.find(story => story.id === featuredStoryId);
    return featuredStory ? featuredStory : stories[0];
  }
);
```

- Test it:

```javascript
describe('featuredStorySelector', function () {
  it('should return featureStory', function () {
    const stories = [1, 2, 3].map(id => StoryFactory.build({ id: id }));

    let state = {
      storyApp: {
        stories: stories,
        featuredStoryId: 2
      }
    };

    featuredStorySelector(state).should.eql(stories[1]);

    state = {
      storyApp: {
        stories: stories,
        featuredStoryId: 4
      }
    };

    featuredStorySelector(state).should.eql(stories[0]);
  });
});
```

- Put it into container:

```javascript
import { connect } from 'react-redux';

import { featuredStorySelector, shouldRenderSelector, smallStoriesSelector } from 'selectors/stories-selector';
import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';


function mapStateToProps(state, ownProps) {
  return {
    shouldRender: shouldRenderSelector(state),
    smallStories: smallStoriesSelector(state),
    featuredStory: featuredStorySelector(state)
  };
}

const mapDispatchToProps = {
  requestStories
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
```

## Reference

- [reselect](https://github.com/reactjs/reselect)
