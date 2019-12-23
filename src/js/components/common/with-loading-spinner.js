import React, { PropTypes } from 'react';

import LoadingSpinner from 'components/common/loading-spinner';


function withLoadingSpinner(ContentComponent, spinnerClassName) {
  function WithLoadingSpinner(props) {
    const { requesting } = props;
    if (requesting)
      return <LoadingSpinner className={ spinnerClassName }/>;
    else
      return <ContentComponent { ...props } />;
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
