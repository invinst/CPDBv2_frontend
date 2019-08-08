import { first, get, isEmpty, replace } from 'lodash';
import { createSelector } from 'reselect';

export const getLogoSectionEditModeOn = state => state.headers.slimHeader.logoSectionEditModeOn;

export const getDemoVideoSectionEditModeOn = state => state.headers.slimHeader.demoVideoSectionEditModeOn;

const getVideoInfo = state => first(get(state, 'headers.slimHeader.videoInfo'));

export const hasVideoInfoSelector = createSelector(
  getVideoInfo,
  info => !isEmpty(info),
);

export const thumbnailUrlSelector = createSelector(
  getVideoInfo,
  info => {
    const rawUrl = (
      get(info, 'thumbnail_small', '') || get(info, 'thumbnail_medium', '') || get(info, 'thumbnail_large', '')
    );
    return replace(rawUrl, '.webp', '.png');
  },
);
