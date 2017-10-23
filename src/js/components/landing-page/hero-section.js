import React, { Component } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  leftColumnStyle,
  boldTextStyle,
  imageStyle,
  imageSrcSet,
  imageSizes,
  imageSrc,
  normalTextStyle,
  wrapperStyle
} from './hero-section.style';


export default class HeroSection extends Component {
  render() {
    return (
      <ResponsiveFluidWidthComponent style={ wrapperStyle }>
        <div style={ leftColumnStyle }>
          <p style={ boldTextStyle }>
            An interactive, visual database of complaint and use of force data of the Chicago Police Department.
          </p>
          <p style={ normalTextStyle }>
            Complaints against employees are made by citizens and employees.
            If a member of the public is dissatisfied with the police service he or she has received or has a complaint
            against a Chicago Police Department member (civilian and sworn),
            he or she can report the incident directly to IPRA/COPA.
          </p>
          <p style={ normalTextStyle }>
            Tactical Response Reports (TRRs) are filled out every time an officer uses force,
            whether that be a chokehold, a taser, or a firearm.
          </p>
          <p style={ normalTextStyle }>
            Filter and manipulate the data across demographics, outcomes and categories, and share your findings.
          </p>
          <a href='https://beta.cpdb.co' style={ boldTextStyle }>View the Data Tool</a>
        </div>
        <a href='https://beta.cpdb.co' style={ imageStyle }>
          <img
            src={ imageSrc }
            srcSet={ imageSrcSet }
            sizes={ imageSizes }
          />
        </a>
      </ResponsiveFluidWidthComponent>
    );
  }
}

HeroSection.propTypes = {

};
