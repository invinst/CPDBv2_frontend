import React from 'react';
import ResponsiveComponent from 'components/responsive-component';
import FeaturedStoryImage from 'components/featured-story-image';
import {
  mediumStoryStyleMobile, mediumStoryStyleTablet, mediumStoryStyleDesktop,
  storyImageStyleMobile, storyImageStyleTablet, storyImageStyleDesktop
} from 'components/story-medium.style';


let src = 'http://ocean.nationalgeographic.com/exposure/core_media/ngphoto/image/83949_0_480x360.jpg';



export default class StoriesMobile extends ResponsiveComponent {
  renderMobile() {
    return (<div>
      <FeaturedStoryImage
        style={ storyImageStyleMobile } src={ src }/>
      <div>
        <div style={ mediumStoryStyleMobile }>Story</div>
      </div>
    </div>);
  }

  renderTablet() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleTablet } src={ src }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ mediumStoryStyleTablet }>Story</div>
      </div>
    </div>);
  }

  renderDesktop() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleDesktop } src={ src }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ mediumStoryStyleDesktop }>Story</div>
      </div>
    </div>);
  }
}
