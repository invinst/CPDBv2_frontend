import { CAROUSEL_TYPES } from 'utils/constants';
import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';


export default CarouselWrapper(
  {
    [CAROUSEL_TYPES.ALLEGATION]: { CardComponent: OfficerCard, itemWidth: 232 },
  },
  CAROUSEL_TYPES.ALLEGATION
);
