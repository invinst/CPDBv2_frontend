import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';
import cx from 'classnames';

import style from './responsive-fluid-width-component-without-inline-style.sass';


export default function ResponsiveFluidWidthComponentWithoutInlineStyle(props) {
  const {
    className, children, minimumClassName, mediumClassName, maximumClassName, minWidthThreshold, maxWidthThreshold,
  } = props;
  return (
    <div className={ className }>
      <MediaQuery maxWidth={ minWidthThreshold - 1 }>
        <div className={ cx('test--fixed-width-component', minimumClassName) }>
          { children }
        </div>
      </MediaQuery>
      <MediaQuery minWidth={ minWidthThreshold } maxWidth={ maxWidthThreshold - 1 }>
        <div className={ mediumClassName }>
          { children }
        </div>
      </MediaQuery>
      <MediaQuery minWidth={ maxWidthThreshold }>
        <div className={ maximumClassName }>
          { children }
        </div>
      </MediaQuery>
    </div>
  );
}

ResponsiveFluidWidthComponentWithoutInlineStyle.propTypes = {
  className: PropTypes.string,
  minimumClassName: PropTypes.string,
  mediumClassName: PropTypes.string,
  maximumClassName: PropTypes.string,
  children: PropTypes.node,
  minWidthThreshold: PropTypes.number,
  maxWidthThreshold: PropTypes.number,
};

ResponsiveFluidWidthComponentWithoutInlineStyle.defaultProps = {
  className: '',
  minimumClassName: style.minimumFixed,
  mediumClassName: style.fluid,
  maximumClassName: style.maximumFixed,
  minWidthThreshold: 768,
  maxWidthThreshold: 1440,
};
