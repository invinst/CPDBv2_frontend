import React, { Component, PropTypes } from 'react';
import { map, find, filter, pick, compact } from 'lodash';

import CoaccusedListItem from './coaccused-list-item';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import { coaccusedListWrapperStyle, coaccusedTextStyle, breakSectionStyle } from './coaccused-list.style';


export default class CoaccusedList extends Component {
  render() {
    const { currentOfficerId, coaccused, openComplaintPage, crid, style } = this.props;
    const currentOfficer = find(coaccused, obj => obj.id === currentOfficerId);
    const otherCoaccused = filter(coaccused, obj => obj.id !== currentOfficerId);

    return (
      <div style={ { ...coaccusedListWrapperStyle, ...style } }>
        <ResponsiveFluidWidthComponent>
          <div className='test--coaccused-text' style={ coaccusedTextStyle }>Coaccused</div>
          {
            map(compact([currentOfficer, ...otherCoaccused]), (officer, index) => {
              const props = pick(officer, ['fullName', 'category', 'id', 'badge']);

              return (
                <CoaccusedListItem key={ officer.id }
                  showBottomBorder={ index !== coaccused.length - 1 }
                  viewing={ officer.id === currentOfficerId } { ...props }
                  openComplaintPage={ openComplaintPage } crid={ crid }/>
              );
            })
          }
        </ResponsiveFluidWidthComponent>
        <div style={ breakSectionStyle }/>
      </div>
    );
  }
}

CoaccusedList.propTypes = {
  currentOfficerId: PropTypes.number,
  crid: PropTypes.string,
  openComplaintPage: PropTypes.func,
  coaccused: PropTypes.array,
  style: PropTypes.object
};
