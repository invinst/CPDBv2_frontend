import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import DocumentCard from './document-card';
import CarouselWrapper from '../carousel-wrapper';

export default CarouselWrapper(DocumentCard, CAROUSEL_TYPES.DOCUMENT);
