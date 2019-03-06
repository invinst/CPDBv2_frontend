import { createSelector } from 'reselect';
import extractQuery from 'utils/extract-query';

const getCrawlers = state => state.crawlersPage.crawlers;
const getPagination = state => state.crawlersPage.pagination;

export const crawlerTransform = crawler => ({
  id: crawler['id'],
  crawlerName: crawler['crawler_name'],
  status: crawler['status'],
  numDocuments: crawler['num_documents'],
  numNewDocuments: crawler['num_new_documents'],
  recentRunAt: crawler['recent_run_at'],
  numSuccessfulRun: crawler['num_successful_run'],
  logUrl: crawler['log_url']
});

export const crawlersSelector = createSelector(
  getCrawlers,
  crawlers => crawlers.map(crawlerTransform)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);
