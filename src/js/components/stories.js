import React, {PropTypes} from 'react';
import StoryMedium from 'components/story-medium';
import StorySmall from 'components/story-small';
import ResponsiveComponent from 'components/responsive-component';
import {
  storiesLinkWrapperStyle, firstSmallStoryStyleMobile, firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from 'components/stories.style';


export default class Stories extends ResponsiveComponent {
  renderMobile() {
    return (<div>
      <StoryMedium story={ this.props.stories[0] }/>
      <div className='pure-g'>
        <div className='pure-u-1-2'>
          <StorySmall style={ firstSmallStoryStyleMobile } story={ this.props.stories[1] }/>
        </div>
        <div className='pure-u-1-2'>
          <StorySmall story={ this.props.stories[2] }/>
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
        <StoryMedium story={ this.props.stories[0] }/>
      </div>
      <div className='pure-u-1-4'>
        <StorySmall style={ firstSmallStoryStyleTablet } story={ this.props.stories[1] }/>
        <StorySmall story={ this.props.stories[2] }/>
      </div>
      <div className='pure-u-1-1' style={ storiesLinkWrapperStyle }>
        <a>More Stories</a>
      </div>
    </div>);
  }

  renderDesktop() {
    return (<div className='pure-g'>
      <div className='pure-u-3-5'>
        <StoryMedium story={ this.props.stories[0] }/>
      </div>
      <div className='pure-g pure-u-2-5'>
        <div className='pure-u-1-2'>
          <StorySmall style={ firstSmallStoryStyleDesktop } story={ this.props.stories[1] }/>
        </div>
        <div className='pure-u-1-2'>
          <StorySmall story={ this.props.stories[2] }/>
        </div>
      </div>
      <div className='pure-u-1-1' style={ storiesLinkWrapperStyle }>
        <a>More Stories</a>
      </div>
    </div>);
  }
}

Stories.propTypes = {
  stories: PropTypes.array
};

Stories.defaultProps = {
  stories: [
    {
      paper: 'New York Times',
      title: 'Complaints against Chicago Police rarely result in discipline data shows.',
      url: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
    },
    {
      paper: 'FiveThirtyEight',
      title: 'How to predict bad cops in Chicago.'
    },
    {
      paper: 'Chicago Magazine',
      title: 'The Laquan McDonald Video Didn\'t "Rip" Chicago Apart, but Now Its Leaders Face a Reckoning.'
    }
  ]
};
