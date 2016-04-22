import React from 'react';

export default class StorySmall extends React.Component {
  render() {
    return (<div style={ this.props.style }>
      <div>Story small</div>
    </div>);
  }
}

StorySmall.propTypes = {
  style: React.PropTypes.object
};
