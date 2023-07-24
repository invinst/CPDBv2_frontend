import React from 'react';
import './modal.sass';
import PropTypes from 'prop-types';


export default class ModalPopup extends React.Component {
  onClose = e => {
    const now = new Date();
    var expDate = new Date().setDate(now.getDate() - 31);
    localStorage.setItem('popupExpirationDate', expDate);
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const expirationDate = localStorage.getItem('popupExpirationDate');
    const now = new Date();
    // eslint-disable-next-line no-console
    //console.log('Here I go again ', this.props.show);
    if (!this.props.show) {
      return null;
    }
    // eslint-disable-next-line no-console
    //console.log(expirationDate);
    // eslint-disable-next-line no-console
    //console.log(now.getTime() / 1000 < expirationDate);
    //localStorage.removeItem('popupClosedRecently');

    if (expirationDate && now.getTime() / 1000 < expirationDate) {
      //return null;
    }

    return (
      <div className='modal' id='modal'>
        <div className='modal-backdrop' onClick={ this.onClose }/>
        <div className='generic-modal-content'>
          <div className='popup-close-button' onClick={ this.onClose }/>
          {/* <h2>Modal Window</h2> */}
          <div className='content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ModalPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
