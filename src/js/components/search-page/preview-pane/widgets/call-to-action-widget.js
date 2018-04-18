import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { containerStyle, buttonStyle, textStyle } from './view-widget.style';


export default class CallToActionWidget extends Component {
  render() {
    const { url, to, text } = this.props;
    return (
      <div style={ containerStyle }>
        <span style={ textStyle }>{ text }</span>
        {
          to ? <Link to={ to } style={ buttonStyle }>→</Link> :
            <a href={ url } style={ buttonStyle }>→</a>
        }
      </div>
    );
  }
}

CallToActionWidget.defaultProps = {
  url: null,
  to: null,
  text: 'View on the Data Tool'
};

CallToActionWidget.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string,
};
