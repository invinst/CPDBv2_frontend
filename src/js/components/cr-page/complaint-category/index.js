import React, { Component, PropTypes } from 'react';

import {
  categoryWrapperStyle,
  categoryStyle,
  subcategoryStyle,
} from 'components/cr-page/complaint-category/complaint-category.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ComplaintCategory extends Component {

  render() {
    const { category, subcategory } = this.props;
    return (
      <ResponsiveFluidWidthComponent>
        <div className='test--cr-category' style={ categoryWrapperStyle }>
          <div className='test--cr-category-category' style={ categoryStyle }>{ category }</div>
          <div className='test--cr-category-subcategory' style={ subcategoryStyle }>{ subcategory }</div>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

ComplaintCategory.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string,
};
