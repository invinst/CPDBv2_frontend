import React, {PropTypes} from 'react';

export default class StorySmall extends React.Component {
  render() {
    return (<div style={ this.props.style }>
      <div>Story small</div>
    </div>);
  }
}

StorySmall.propTypes = {
  style: PropTypes.object
};
