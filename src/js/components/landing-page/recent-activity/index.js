import React from 'react';

import { CAROUSEL_TYPES, ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';
import OfficerCard from 'components/common/officer-card';
import PairingCard from 'components/landing-page/common/pairing-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';

export default CarouselWrapper(
  {
    [ACTIVITY_GRID_CARD_TYPES.OFFICER]: { CardComponent: OfficerCard, itemWidth: 232 },
    [ACTIVITY_GRID_CARD_TYPES.PAIR]: { CardComponent: PairingCard, itemWidth: 464 },
  },
  CAROUSEL_TYPES.ACTIVITY
);
