import React from 'react';
import StoryMedium from 'components/story-medium';
import StorySmall from 'components/story-small';
import ResponsiveComponent from 'components/responsive-component';
import {
  storiesLinkWrapperStyle, firstSmallStoryStyleMobile, firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from 'components/stories.style';


export default class StoriesMobile extends ResponsiveComponent {
  renderMobile() {
    return (<div>
      <StoryMedium/>
      <div className='pure-g'>
        <div className='pure-u-1-2'>
          <StorySmall style={ firstSmallStoryStyleMobile }/>
        </div>
        <div className='pure-u-1-2'>
          <StorySmall/>
        </div>
      </div>
      <div style={ storiesLinkWrapperStyle }>
        <a>More Stories</a>
      </div>
    </div>);
  }

  renderTablet() {
    return (<div className='pure-g'>
      <div className='pure-u-3-4'>
        <StoryMedium/>
      </div>
      <div className='pure-u-1-4'>
        <StorySmall style={ firstSmallStoryStyleTablet }/>
        <StorySmall/>
      </div>
      <div className='pure-u-1-1' style={ storiesLinkWrapperStyle }>
        <a>More Stories</a>
      </div>
    </div>);
  }

  renderDesktop() {
    return (<div className='pure-g'>
      <div className='pure-u-3-5'>
        <StoryMedium/>
      </div>
      <div className='pure-g pure-u-2-5'>
        <div className='pure-u-1-2'>
          <StorySmall style={ firstSmallStoryStyleDesktop }/>
        </div>
        <div className='pure-u-1-2'>
          <StorySmall/>
        </div>
      </div>
      <div className='pure-u-1-1' style={ storiesLinkWrapperStyle }>
        <a>More Stories</a>
      </div>
    </div>);
  }
}
