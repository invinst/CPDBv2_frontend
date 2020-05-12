import { isPinboardFeatureEnabled } from 'utils/pinboard';


export const isPinButtonIntroductionVisitedSelector = (
  state => !isPinboardFeatureEnabled() || state.pinboardIntroduction.isPinButtonIntroductionVisited
);

export const isPinboardButtonIntroductionVisitedSelector = (
  state => !isPinboardFeatureEnabled() || state.pinboardIntroduction.isPinboardButtonIntroductionVisited
);

export const isPinboardIntroductionVisitedSelector = (
  state => !isPinboardFeatureEnabled() || state.pinboardIntroduction.isPinboardIntroductionVisited
);
