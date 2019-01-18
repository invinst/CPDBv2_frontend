import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DownloadMenu from 'components/headers/shareable-header/download-menu';

import { fetchOfficerZipFileUrl } from 'actions/officer-page';
import { getZipFileUrl, getOfficerId } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    zipFileUrl: getZipFileUrl(state),
    isRequestingZipURL: state.officerPage.isRequestingZipURL,
    officerId: getOfficerId(state),
  };
}

const mapDispatchToProps = {
  fetchOfficerZipFileUrl,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DownloadMenu));
