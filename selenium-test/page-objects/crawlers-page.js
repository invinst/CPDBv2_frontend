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
      lastCrawlerName: '(//span[contains(@class, "crawler-name")])[last()]',
      lastRecentRunAt: '(//span[contains(@class, "recent-run")])[last()]',
      lastNumNewDocuments: '(//span[contains(@class, "num-new-documents")])[last()]',
      lastNumDocuments: '(//span[contains(@class, "num-documents")])[last()]',
      firstCrawlerRow: '(//a[contains(@class, "crawler-row")])[1]',
      breadcrumbsItem: '(//li[contains(@class, "breadcrumbs-item")])[2]',
      documentsButton: '(//a[contains(@class, "button")])',

      crawlerNameHeader: '.header-col.crawler-header',
      recentRunAtHeader: '(//*[@class="header-col"])[1]',
      numNewDocumentsHeader: '(//*[@class="header-col"])[2]',
      numDocumentsHeader: '(//*[@class="header-col"])[3]'
    });
  }
}

class CrawlersPage extends Page {
  tableSection = new TableSection();

  open() {
    super.open('/crawlers/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new CrawlersPage();
