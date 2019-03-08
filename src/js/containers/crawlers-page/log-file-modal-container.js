import React from 'react';
import { connect } from 'react-redux';

import { currentCrawler } from 'selectors/crawlers-page';
import LogFileModalContent from 'components/generic-modal/log-file-modal-content';


const mapStateToProps = (state, ownProps) => {
  return {
    crawler: currentCrawler(state)
  };
};

export default connect(mapStateToProps)(LogFileModalContent);
