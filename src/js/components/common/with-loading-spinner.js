import React, { PropTypes, Component } from 'react';

import LoadingSpinner from 'components/common/loading-spinner';


function withLoadingSpinner(ContentComponent, spinnerClassName) {
  class WithLoadingSpinner extends Component {
    render() {
      const { requesting } = this.props;
      if (requesting)
        return <LoadingSpinner className={ spinnerClassName }/>;
      else
        return <ContentComponent { ...this.props } />;
    }
  }

  WithLoadingSpinner.propTypes = {
    requesting: PropTypes.bool,
  };

  WithLoadingSpinner.defaultProps = {
    requesting: false,
  };

  return WithLoadingSpinner;
}
export default withLoadingSpinner;
