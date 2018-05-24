import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import { containerStyle, footerStyle, questionMarInnerStyle, questionMarkStyle } from './radar-chart-explainer.style';
import TriangleExplainer from './triangle-explainer';
import ScaleExplainer from './scale-explainer';
import PercentilesByYear from './percentiles-by-year';
import LeftNavigation from './left-navigation';
import RightNavigation from './right-navigation';
import { MOBILE_BREAK_POINT } from 'utils/constants';


const NAVIGATION_TEXTS = ['What is this triangle?', 'What is the scale?', 'Percentiles by year'];

export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPaneIndex: 0,
      show: false,
    };

    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
    this.toggleExplainer = this.toggleExplainer.bind(this);
  }

  renderExplainer() {
    const { radarChartData, year } = this.props;

    switch (this.state.currentPaneIndex) {
      case 1:
        return <ScaleExplainer year={ year } radarChartData={ radarChartData }/>;
      case 2:
        return <PercentilesByYear/>;
      default:
        return <TriangleExplainer radarChartData={ radarChartData }/>;
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
      currentPaneIndex: (this.state.currentPaneIndex - 1 + textLength) % textLength
    });
  }

  navigateRight() {
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex + 1) % NAVIGATION_TEXTS.length
    });
  }


  toggleExplainer() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const [leftNavigationText, rightNavigationText] = this.getCurrentNavigationTexts();


    return (
      <MediaQuery minWidth={ MOBILE_BREAK_POINT }>
        {
          show && (
            <div className='test--radar-explainer-window' style={ containerStyle }>
              { this.renderExplainer() }
              <div style={ footerStyle }>
                <LeftNavigation onClickHandler={ this.navigateLeft } text={ leftNavigationText }/>
                <RightNavigation onClickHandler={ this.navigateRight } text={ rightNavigationText }/>
              </div>
            </div>
          )
        }
        <div
          className='test--radar-explainer-toggle-button'
          style={ questionMarkStyle }
          onClick={ this.toggleExplainer }>
          <span style={ questionMarInnerStyle }>{ show ? 'X' : '?' }</span>
        </div>
      </MediaQuery>
    );
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
  year: PropTypes.number
};
