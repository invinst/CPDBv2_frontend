import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import ComplaintSummaryCard from './complaint-summary-card';
import CarouselWrapper from '../carousel-wrapper';

export default CarouselWrapper(ComplaintSummaryCard, CAROUSEL_TYPES.COMPLAINT);
