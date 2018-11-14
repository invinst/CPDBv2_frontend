import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';

import { footerStyle } from './officer-card-footer.style';


export default class OfficerCardFooter extends Component {
  render() {
    const { coaccusalCount } = this.props;
    return (
      <div style={ footerStyle } className='test--officer-card-footer'>
        Coaccused in { pluralize('case', coaccusalCount, true) }.
      </div>
    );
  }
}

OfficerCardFooter.propTypes = {
  coaccusalCount: PropTypes.number,
};
