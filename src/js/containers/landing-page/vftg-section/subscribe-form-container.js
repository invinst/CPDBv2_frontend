import { connect } from 'react-redux';

import SubscribeForm from 'components/landing-page/vftg-section/subscribe-form';
import { subscribeEmail } from 'actions/landing-page/vftg';


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  subscribeEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeForm);
