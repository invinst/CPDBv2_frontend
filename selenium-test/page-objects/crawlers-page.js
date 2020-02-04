import Page from './page';
import Section from './sections/section';


class TableSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstCrawlerName: '(//span[contains(@class, "crawler-name")])[1]',
      firstRecentRunAt: '(//span[contains(@class, "recent-run")])[1]',
      firstNumNewDocuments: '(//span[contains(@class, "num-new-documents")])[1]',
      firstNumDocuments: '(//span[contains(@class, "num-documents")])[1]',
      firstSuccessfulRuns: '(//span[contains(@class, "num-successful-runs")])[1]',
      firstCrawlerRow: '(//div[contains(@class, "crawler-row")])[1]',
      lastCrawlerName: '(//span[contains(@class, "crawler-name")])[last()]',
      lastRecentRunAt: '(//span[contains(@class, "recent-run")])[last()]',
      lastNumNewDocuments: '(//span[contains(@class, "num-new-documents")])[last()]',
      lastNumDocuments: '(//span[contains(@class, "num-documents")])[last()]',
      lastSuccessfulRuns: '(//span[contains(@class, "num-successful-runs")])[last()]',
      lastCrawlerRow: '(//div[contains(@class, "crawler-row")])[last()]',
      breadcrumbsItem: '//*[contains(@class, "breadcrumb-item")][last()]',
      documentsButton: '(//a[contains(@class, "button")])',

      logFileModal: '(//div[contains(@class, "log-file-modal")])',
      logFileModalTitle: '(//div[contains(@class, "modal-title")])',
      logFileCloseButton: '(//div[contains(@class, "log-file-close-button")])',

      crawlerNameHeader: '.header-col.crawler-header',
      recentRunAtHeader: '(//*[@class="header-col"])[1]',
      numNewDocumentsHeader: '(//*[@class="header-col"])[2]',
      numDocumentsHeader: '(//*[@class="header-col"])[3]',
      numSuccessfulRuns: '(//*[@class="header-col"])[4]',
      row: '//div[contains(@class, "crawler-row")]',
    });
  }
}

class CrawlersPage extends Page {
  tableSection = new TableSection();

  open() {
    super.open('/crawlers/');
  }
}

module.exports = new CrawlersPage();
