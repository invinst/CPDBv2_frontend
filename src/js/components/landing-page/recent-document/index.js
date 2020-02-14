import { CAROUSEL_TYPES } from 'utils/constants';
import DocumentCard from './document-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.DOCUMENT]: { CardComponent: DocumentCard, itemWidth: 232 },
  },
  CAROUSEL_TYPES.DOCUMENT
);
