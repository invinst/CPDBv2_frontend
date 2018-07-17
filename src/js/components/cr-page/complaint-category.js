import React, { Component, PropTypes } from 'react';

import {
  categoryWrapperStyle,
  categoryStyle,
  subcategoryStyle,
  popupStyle
} from 'components/cr-page/complaint-category.style';
import Popup from 'components/common/popup';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ComplaintCategory extends Component {

  render() {
    const { category, subcategory, popup } = this.props;
    return (
      <ResponsiveFluidWidthComponent>
        <div className='test--cr-category' style={ categoryWrapperStyle }>
          <div className='test--cr-category-category' style={ categoryStyle }>
            { category }
            <Popup
              { ...popup }
              style={ popupStyle }
            />
          </div>
          <div className='test--cr-category-subcategory' style={ subcategoryStyle }>{ subcategory }</div>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

ComplaintCategory.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string,
  popup: PropTypes.object,
};
