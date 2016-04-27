import React, {PropTypes} from 'react';
import _ from 'lodash';

import {paperStyle, wrapperStyle} from 'components/story-small.style';


export default class StorySmall extends React.Component {
  render() {
    return (<div style={ _.assign({}, wrapperStyle, this.props.style) }>
      <h6 style={ paperStyle }>{ this.props.story.paper }</h6>
      <p>{ this.props.story.title }</p>
    </div>);
  }
}

StorySmall.propTypes = {
  style: PropTypes.object,
  story: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

StorySmall.defaultProps = {
  story: {
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.'
  }
};
