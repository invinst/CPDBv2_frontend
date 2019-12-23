import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editModeOn } from 'utils/edit-path';


export default class EditModeProvider extends Component {
  getChildContext() {
    return {
      editModeOn: editModeOn(this.getPathname()),
    };
  }

  getPathname() {
    const { pathname, location } = this.props;
    return pathname ? pathname : location.pathname;
  }

  render() {
    const { children, ...rest } = this.props;
    delete rest.pathname;
    delete rest.location;
    return <div { ...rest }>{ children }</div>;
  }
}

EditModeProvider.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  location: PropTypes.object,
};

EditModeProvider.defaultProps = {
  location: {
    pathname: '',
  },
};

EditModeProvider.childContextTypes = {
  editModeOn: PropTypes.bool,
};
