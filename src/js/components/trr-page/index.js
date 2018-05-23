import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import {
  wrapperStyle, TRRIdHeaderStyle,
} from './trr-page.style';
import OfficerSection from './officer-section';


export default class TRRPage extends Component {
  componentDidMount() {
    const { trrId, fetchTRR } = this.props;

    fetchTRR(trrId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTRR, trrId } = nextProps;
    if (this.props.trrId !== trrId) {
      fetchTRR(trrId);
    }
  }

  render() {
    const {
      trrId, officer
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ShareableHeaderContainer/>
        <ResponsiveFluidWidthComponent>
          <h1 className='test--trr-title' style={ TRRIdHeaderStyle }>TRR { trrId }</h1>
          <OfficerSection officer={ officer }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

TRRPage.propTypes = {
  trrId: PropTypes.string,
  officer: PropTypes.object,
  fetchTRR: PropTypes.func,
};

TRRPage.defaultProps = {
  fetchTRR: () => {},
};
