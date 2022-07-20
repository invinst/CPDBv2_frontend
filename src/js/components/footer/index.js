import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import NoRerender from 'components/common/higher-order/no-rerender';
import { showIntercomMessages } from 'utils/intercom';
import FooterNavLink from './footer-nav-link';
import styles from './footer.sass';
import { INVISIBLE_INSTITUTE_URL } from 'utils/constants';
import OutboundLink from 'components/common/outbound-link';
import responsiveContainerStyles from 'components/common/responsive-container.sass';

function Footer(props) {
  const { openLegalDisclaimerModal, className } = props;
  const links = [
    {
      name: 'Legal',
      onClick: openLegalDisclaimerModal,
    },
    {
      name: 'GitHub',
      externalHref: 'https://github.com/invinst/',
    },
    {
      name: 'Contact',
      onClick: () => { showIntercomMessages(true); },
    },
  ];

  return (
    <div className={ cx(styles.footer, className, 'no-print') }>
      <div className={ cx(responsiveContainerStyles.responsiveContainer, 'nav-links-wrapper') }>
        { links.map((link, ind) => (
          <FooterNavLink
            className='footer-nav-link'
            key={ ind }
            { ...link }
          />
        )) }
      </div>
      <div className='invist-wrapper'>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <OutboundLink
            className='invist-logo test--footer-invinst-logo'
            href={ INVISIBLE_INSTITUTE_URL }
          />
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  openLegalDisclaimerModal: PropTypes.func,
  className: PropTypes.string,
};

Footer.defaultProps = {
  style: {},
};

export default NoRerender(Footer);
