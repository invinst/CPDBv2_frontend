import { CAROUSEL_TYPES } from 'utils/constants';
import TopLawsuitCard from './top-lawsuit-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.LAWSUIT]: { CardComponent: TopLawsuitCard, itemWidth: 232 },
  },
  CAROUSEL_TYPES.LAWSUIT
);
