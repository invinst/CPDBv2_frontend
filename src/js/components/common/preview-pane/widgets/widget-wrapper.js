import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import cx from 'classnames';

import CallToActionWidget from './call-to-action-widget';
import WrapperLink from './wrapper-link';
import styles from './widget-wrapper.sass';


export default class WidgetWrapper extends Component {
  render() {
    const { maxHeight, callToAction, className, children, yScrollable } = this.props;
    const { to, url, text } = callToAction;

    return (
      <WrapperLink url={ url } to={ to }>
        <div className={ cx(className, styles.wrapper) }>
          <div className='responsive-container-common'>
            { children }
            { !yScrollable &&
              <MediaQuery maxHeight={ maxHeight }>
                <div className='gradient test--gradient' />
              </MediaQuery>
            }
          </div>
          { url || to ? <CallToActionWidget text={ text }/> : null }
        </div>
      </WrapperLink>
    );
  }
}

WidgetWrapper.defaultProps = {
  className: '',
  callToAction: {},
  maxHeight: 990,
  yScrollable: false,
};

WidgetWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  callToAction: PropTypes.object,
  maxHeight: PropTypes.number,
  yScrollable: PropTypes.bool,
};
