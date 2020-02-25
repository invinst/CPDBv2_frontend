import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import NewCallToActionWidget from './new-call-to-action-widget';
import styles from './new-widget-wrapper.sass';
import WrapperLink from './wrapper-link';


export default class NewWidgetWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.element = null;
    this.state = { height: this.getHeight() };
  }
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ height: this.getHeight() });
  }

  componentDidUpdate() {
    const height = this.getHeight();
    if (this.state.height !== height)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ height });
  }

  getHeight() {
    const { to, url } = this.props.callToAction;
    const offset = url || to ? 146 : 106;
    const contentHeight = this.element ? this.element.clientHeight : 0;
    return offset + contentHeight;
  }

  render() {
    const { callToAction, className, children, yScrollable, isClickable } = this.props;
    const { text, to, url } = callToAction;

    return (
      <WrapperLink url={ isClickable ? url : undefined } to={ isClickable ? to : undefined }>
        <div className={ `${styles.newWidgetWrapper} ${className}` }>
          { url || to ? (
            <div className='new-call-to-action-widget-container'>
              <WrapperLink url={ !isClickable ? url : undefined } to={ !isClickable ? to : undefined }>
                <NewCallToActionWidget text={ text }/>
              </WrapperLink>
            </div>
          ) : null
          }
          <div className='widget-wrapper-responsive-container' ref={ el => this.element = el }>
            { children }
            { !yScrollable &&
              <MediaQuery maxHeight={ this.state.height }>
                <div className='widget-wrapper-gradient'/>
              </MediaQuery>
            }
          </div>
        </div>
      </WrapperLink>
    );
  }
}

NewWidgetWrapper.defaultProps = {
  className: '',
  callToAction: {},
  yScrollable: false,
  isClickable: true,
};

NewWidgetWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  callToAction: PropTypes.object,
  yScrollable: PropTypes.bool,
  isClickable: PropTypes.bool,
};
