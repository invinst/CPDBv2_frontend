import React from "react";
import "./modal.css";
import PropTypes from "prop-types";
import style from "../generic-modal/legal-disclaimer-modal-content.sass";
import cx from "classnames";
import {Style} from "radium";


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
    console.log('Here I go again ', this.props.show);
    if (!this.props.show) {
      return null;
    }
    // eslint-disable-next-line no-console
    console.log(expirationDate);
    // eslint-disable-next-line no-console
    console.log(now.getTime() / 1000 < expirationDate);
    //localStorage.removeItem('popupClosedRecently');

    if (expirationDate && now.getTime() / 1000 < expirationDate) {
      return '';
    }

    return (
      <div className='modal' id='modal'>
        <div className='generic-modal-content'>
          <h2>Modal Window</h2>
          <div className='content'>
            {this.props.children}
          </div>
          <div className='actions'>
            <button className='toggle-button' onClick={this.onClose}>
              close
            </button>
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
