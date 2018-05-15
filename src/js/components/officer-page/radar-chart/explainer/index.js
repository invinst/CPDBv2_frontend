import React, { Component, PropTypes } from 'react';

import { containerStyle, footerStyle, closeButtonInnerStyle, closeButtonStyle } from './radar-chart-explainer.style';
import TriangleExplainer from './triangle-explainer';
import ScaleExplainer from './scale-explainer';
import PercentilesByYearExplainer from './percentiles-by-year';
import LeftNavigation from './left-navigation';
import RightNavigation from './right-navigation';


const NAVIGATION_TEXTS = ['What is this triangle?', 'What is the scale?', 'Percentiles by year'];
const EXPLAINERS = [TriangleExplainer, ScaleExplainer, PercentilesByYearExplainer];

export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPaneIndex: 0,
    };

  }

  getCurrentNavigationTexts() {
    const { currentPaneIndex } = this.state;
    const textLength = NAVIGATION_TEXTS.length;
    const leftNavigationIndex = (currentPaneIndex - 1 + textLength) % textLength;
    const rightNavigationIndex = (currentPaneIndex + 1) % textLength;
    return [NAVIGATION_TEXTS[leftNavigationIndex], NAVIGATION_TEXTS[rightNavigationIndex]];
  }

  navigateLeft() {
    const textLength = NAVIGATION_TEXTS.length;
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex - 1 + textLength) % textLength
    });
  }

  navigateRight() {
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex + 1) % NAVIGATION_TEXTS.length
    });
  }

  render() {
    const { radarChartData, closeHandler, show } = this.props;
    const [leftNavigationText, rightNavigationText] = this.getCurrentNavigationTexts();

    const Explainer = EXPLAINERS[this.state.currentPaneIndex];

    return show ? (
      <div style={ containerStyle }>
        <div
          className='test--radar-explainer-close-button'
          style={ closeButtonStyle }
          onClick={ closeHandler }>
          <span style={ closeButtonInnerStyle }>X</span>
        </div>
        <Explainer radarChartData={ radarChartData }/>
        <div style={ footerStyle }>
          <LeftNavigation onClickHandler={ this.navigateLeft.bind(this) } text={ leftNavigationText }/>
          <RightNavigation onClickHandler={ this.navigateRight.bind(this) } text={ rightNavigationText }/>
        </div>
      </div>
    ) : null;
  }
}

RadarExplainer.propTypes = {
  show: PropTypes.bool,
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  closeHandler: PropTypes.func,
};
