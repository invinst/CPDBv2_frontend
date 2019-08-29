import React, { Component, PropTypes } from 'react';
import { get, findLast } from 'lodash';

import TriangleExplainer from './triangle-explainer';
import ScaleExplainer from './scale-explainer';
import PercentilesByYear from './percentiles-by-year';
import LeftNavigation from './left-navigation';
import RightNavigation from './right-navigation';
import { hasEnoughRadarChartData } from 'utils/radar-chart';
import styles from './explainer.sass';


const NAVIGATION_TEXTS = ['What is this triangle?', 'What is the scale?', 'Percentiles by year'];

export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPaneIndex: 0,
    };

    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }

  renderExplainer() {
    const { radarChartData, scaleEditWrapperStateProps, triangleEditWrapperStateProps } = this.props;
    const lastData = findLast(radarChartData, (yearlyData) => hasEnoughRadarChartData(yearlyData.items));
    const lastDataItems = get(lastData, 'items');
    const lastDataYear = get(lastDataItems, 'year');

    switch (this.state.currentPaneIndex) {
      case 1:
        return (
          <ScaleExplainer
            year={ lastDataYear }
            radarChartData={ lastDataItems }
            editWrapperStateProps={ scaleEditWrapperStateProps }
          />
        );
      case 2:
        return <PercentilesByYear yearlyRadarChartData={ radarChartData }/>;
      default:
        return (
          <TriangleExplainer
            radarChartData={ lastDataItems }
            editWrapperStateProps={ triangleEditWrapperStateProps }
          />
        );
    }
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
      currentPaneIndex: (this.state.currentPaneIndex - 1 + textLength) % textLength,
    });
  }

  navigateRight() {
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex + 1) % NAVIGATION_TEXTS.length,
    });
  }

  render() {
    const [leftNavigationText, rightNavigationText] = this.getCurrentNavigationTexts();

    return (
      <div className={ styles.explainer }>
        <div className='radar-explainer-window'>
          { this.renderExplainer() }
          <div className='explainer-footer'>
            <LeftNavigation onClickHandler={ this.navigateLeft } text={ leftNavigationText }/>
            <RightNavigation onClickHandler={ this.navigateRight } text={ rightNavigationText }/>
          </div>
        </div>
        <div
          className='radar-explainer-close-button'
          onClick={ this.props.closeExplainer }
        >
          <div className='close-inner'>&times;</div>
        </div>
      </div>
    );
  }
}

RadarExplainer.propTypes = {
  radarChartData: PropTypes.array,
  closeExplainer: PropTypes.func,
  triangleEditWrapperStateProps: PropTypes.object,
  scaleEditWrapperStateProps: PropTypes.object,
};
