import React, { Component, PropTypes } from 'react';
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
    const { callToAction, className, children } = this.props;
    const { to, url, text } = callToAction;

    return (
      <WrapperLink url={ url } to={ to }>
        <div className={ `${styles.newWidgetWrapper} ${className}` }>
          { url || to ? <NewCallToActionWidget text={ text }/> : null }
          <div
            className='widget-wrapper-responsive-container'
            ref={ el => this.element = el }
          >
            { children }
            <MediaQuery maxHeight={ this.state.height }>
              <div className='widget-wrapper-gradient'/>
            </MediaQuery>
          </div>
        </div>
      </WrapperLink>
    );
  }
}

NewWidgetWrapper.defaultProps = {
  className: '',
  callToAction: {},
};

NewWidgetWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  callToAction: PropTypes.object,
};
