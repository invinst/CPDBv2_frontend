import React, { Component, PropTypes } from 'react';
import { map, find, filter, pick } from 'lodash';

import CoaccusedListItem from './coaccused-list-item';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { coaccusedListWrapperStyle, coaccusedTextStyle, contentWrapperStyle } from './coaccused-list.style';


export default class CoaccusedList extends Component {
  render() {
    const { currentOfficerId, coaccused, openBottomSheetWithComplaint, crid } = this.props;
    const currentOfficer = find(coaccused, obj => obj.id === currentOfficerId);
    const otherCoaccused = filter(coaccused, obj => obj.id !== currentOfficerId);

    return (
      <div style={ coaccusedListWrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ contentWrapperStyle }>
            <div style={ coaccusedTextStyle }>Co-accused</div>
            {
              map([currentOfficer, ...otherCoaccused], (officer, index) => {
                const props = pick(officer, ['fullName', 'gender', 'race', 'category', 'id']);

                return (
                  <CoaccusedListItem
                    key={ index } viewing={ officer.id === currentOfficerId } { ...props }
                    openBottomSheetWithComplaint={ openBottomSheetWithComplaint } crid={ crid }/>
                );
              })
            }
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

CoaccusedList.propTypes = {
  currentOfficerId: PropTypes.number,
  crid: PropTypes.string,
  openBottomSheetWithComplaint: PropTypes.func,
  coaccused: PropTypes.array
};
