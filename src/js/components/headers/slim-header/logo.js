import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';
import { editMode } from 'utils/edit-path';
import { logoWrapperStyle } from './slim-header.style';
import { ROOT_PATH } from 'utils/constants';

export default class Logo extends Component {
  render() {
    const { leftLinkStyle, editModeOn, subtitleStyle } = this.props;
    return (
      <div style={ logoWrapperStyle }>
        <MediaQuery minWidth={ 830 }>
          { (matches) => (
            <Link
              style={ leftLinkStyle }
              to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
              className='test--header-logo'
            >
              { matches ? 'Citizens Police Data Project' : 'CPDP' }
            </Link>
          ) }
        </MediaQuery>
        <MediaQuery minWidth={ 950 }>
          <div style={ subtitleStyle }>
            <div> collects and publishes information</div>
            <div> about police misconduct in Chicago.</div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

Logo.propTypes = {
  editModeOn: PropTypes.bool,
  leftLinkStyle: PropTypes.object,
  subtitleStyle: PropTypes.object
};
