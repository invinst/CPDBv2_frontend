import React, { Component, PropTypes } from 'react';


class RadarExplainerModalContent extends Component {
  render() {
    return (
      <div >
        This is new modal for Radar Explainer
      </div>
    );
  }
}

RadarExplainerModalContent.propTypes = {
  closeModal: PropTypes.func
};

export default RadarExplainerModalContent;
