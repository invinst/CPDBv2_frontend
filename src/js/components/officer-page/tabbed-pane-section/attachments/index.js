import React, { Component, PropTypes } from 'react';

export default class Attachments extends Component {

  render() {
    const { complaints } = this.props;
    return (
      <div>{complaints}</div>
    );
  }
}

Attachments.propTypes = {
  complaints: PropTypes.array,
};
