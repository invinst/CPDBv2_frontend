import { stub } from 'sinon';


export function getTwitterWidgets() {
  if (global.Mocha !== undefined) {
    return { createTimeline: stub() };
  }
  /* istanbul ignore next */
  return global.twttr.widgets;
}
