import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DownloadMenu from 'components/headers/shareable-header/download-menu';

import { fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl } from 'actions/officer-page';
import { getZipFileUrl, getOfficerId } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    zipFileUrlWithDocs: getZipFileUrl(state, true),
    zipFileUrl: getZipFileUrl(state, false),
    officerId: getOfficerId(state),
  };
}

const mapDispatchToProps = {
  fetchOfficerZipFileUrl,
  fetchOfficerZipWithDocsFileUrl,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DownloadMenu));
