import React, { PropTypes, Component } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import Slider from './slider';
import LeftPane from './left-pane';
import SimulatedSocialGraph from './simulated-social-graph';
import { rightPane, wrapperStyle } from './social-graph-page.style';


export default class SocialGraphPage extends Component {
  render() {
    const { nodes, links, legend, yearRange, setYearRange } = this.props;
    return (
      <div style={ wrapperStyle }>
        <ResponsiveFluidWidthComponent>
          <Slider value={ yearRange } onChange={ setYearRange }/>
          <div>
            <LeftPane legend={ legend } numOfficers={ nodes.length }/>
            <div style={ rightPane }>
              <SimulatedSocialGraph
                nodes={ nodes }
                links={ links }
              />
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

SocialGraphPage.propTypes = {
  nodes: PropTypes.array,
  links: PropTypes.array,
  legend: PropTypes.object,
  yearRange: PropTypes.array,
  officerId: PropTypes.number,
  setYearRange: PropTypes.func
};
