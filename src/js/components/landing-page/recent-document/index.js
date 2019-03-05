import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import DocumentCard from './document-card';
import CarouselWrapper from '../carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.DOCUMENT]: { CardComponent: DocumentCard, itemWidth: 232 }
  },
  CAROUSEL_TYPES.DOCUMENT
);
