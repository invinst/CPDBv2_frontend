import Section from './sections/section';

class PreviewPaneSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      previewPane: '//div[contains(@class, "preview-pane")]',
      officerPreviewPaneName: '//h1[contains(@class, "test--officer-name")]',
      edgePreviewPaneHeader: '(//div[@class="edge-coaccusals-pane-header"])',
      crPreviewPaneTitle: '//div[contains(@class, "cr-preview-pane-title-title")]',
      crPreviewPaneSubtitle: '//div[contains(@class, "cr-preview-pane-title-subtitle")]',
      crPreviewPaneIncidentDate: '//div[contains(@class, "cr-preview-pane-info-row")]',
      crPreviewPaneAddress: '//div[contains(@class, "cr-preview-pane-address")]',
      crPreviewPaneVictims: '//div[@class="cr-preview-pane-victims"]',
      radarChart: '//div[contains(@class, "preview-pane")]//*[name()="svg" and contains(@class, "radar")]',
      firstAccusedOfficerRadarChart: '//ul[@class="list-widget-list"]//*[name()="svg"]',
      firstAccusedOfficerName: '//p[contains(@class, "list-widget-list-item-name")][1]',
      firstAccusedAllegationCount: '//p[contains(@class, "list-widget-list-item-count")][1]',
      overlay: '//div[@class="overlay" and @aria-hidden="false"]',
    });
  }

  edgeCoaccusalsItems() {
    return $$('//div[contains(@class, "item__item")]');
  }
}


class SummaryWidget extends Section {
  constructor(parentSelector='') {
    super(parentSelector);

    this.summaryItemSelector = `${parentSelector}//div[@class="summary-item"]`;
    const firstSummaryItemSelector = '(//div[@class="summary-item"])[1]';
    const secondSummaryItemSelector = '(//div[@class="summary-item"])[2]';

    this.prepareElementGetters({
      widgetTitle: '//div[contains(@class, "widget-title")]',
      spinner: '//*[contains(@class, "widget__widget-spinner")]',
      firstSummaryItemTitle: `${firstSummaryItemSelector}//div[contains(@class, "item-title")]`,
      firstSummaryItemCount: `${firstSummaryItemSelector}//div[contains(@class, "item-count")]`,
      secondSummaryItemTitle: `${secondSummaryItemSelector}//div[contains(@class, "item-title")]`,
      secondSummaryItemCount: `${secondSummaryItemSelector}//div[contains(@class, "item-count")]`,
    });
  }

  summaryItems() {
    return $$(this.summaryItemSelector);
  }
}

const summarySectionSelectorByTitle = (title) => (
  `//div[contains(@class, "widget__widget")]/div[contains(text(), "${title}")]/..`
);

module.exports = {
  PreviewPaneSection,
  SummaryWidget,
  summarySectionSelectorByTitle,
};
