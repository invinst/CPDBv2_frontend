import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from '../carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.ALLEGATION]: { CardComponent: OfficerCard, itemWidth: 232 },
  },
  CAROUSEL_TYPES.ALLEGATION
);
