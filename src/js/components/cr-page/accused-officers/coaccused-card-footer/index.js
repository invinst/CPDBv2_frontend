import React, { PropTypes, Component } from 'react';

import {
  bottomSectionWrapperStyle,
  categoryTextStyle,
  outcomeTextWrapperStyle,
  findingOutcomeMixStyle
} from './coaccused-card-footer.style';


export default class CoaccusedCardFooter extends Component {
  render() {
    const { category, finding, disciplined, findingOutcomeMix, hovering } = this.props;
    return (
      <div style={ bottomSectionWrapperStyle }>
        <div style={ categoryTextStyle(hovering) } className='test--accused-card-category'>{ category }</div>
        <div style={ outcomeTextWrapperStyle(finding, disciplined) } className='test--accused-card-outcome'>
          <div style={ findingOutcomeMixStyle }>{ findingOutcomeMix }</div>
        </div>
      </div>
    );
  }
}

CoaccusedCardFooter.propTypes = {
  finding: PropTypes.string,
  disciplined: PropTypes.bool,
  category: PropTypes.string,
  hovering: PropTypes.bool,
  findingOutcomeMix: PropTypes.string,
};
