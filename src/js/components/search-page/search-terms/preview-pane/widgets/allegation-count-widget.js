import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';


export default class AllegationCountWidget extends Component {
  render() {
    return (
      <div className='test--allegation-widget'>
        { pluralize('allegation', this.props.numOfAllegations, true) }
      </div>
    );
  }
}

AllegationCountWidget.propTypes = {
  numOfAllegations: PropTypes.number.isRequired
};
