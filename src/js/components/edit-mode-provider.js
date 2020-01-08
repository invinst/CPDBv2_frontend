import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editModeOn } from 'utils/edit-path';
import { EditModeContext } from 'contexts';


export default class EditModeProvider extends Component {
  getPathname() {
    const { pathname, location } = this.props;
    return pathname ? pathname : location.pathname;
  }

  getEditModeOn() {
    return editModeOn(this.getPathname());
  }

  render() {
    const { children, ...rest } = this.props;
    const editModeOn = this.getEditModeOn();
    delete rest.pathname;
    delete rest.location;
    return (
      <EditModeContext.Provider value={ { editModeOn } }>
        <div { ...rest }>{ children }</div>
      </EditModeContext.Provider>
    );
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
