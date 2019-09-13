import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import ComplaintSummaryCard from './complaint-summary-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.COMPLAINT]: { CardComponent: ComplaintSummaryCard, itemWidth: 232 },
  },
  CAROUSEL_TYPES.COMPLAINT
);
