import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "social-graph-title")])',
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      toggleTimelineIcon: '(//button[contains(@class, "toggle-timeline-btn")]//div)',
      searchInput: '(//input[contains(@class, "graph-search-input")])',
      searchButton: '(//button[contains(@class, "graph-search-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      coaccusalsThresholdSlider: '(//div[@class="coaccusals-threshold-slider-container"]' +
        '//div[contains(@class, "coaccusals-threshold-slider")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      complaintOriginAll: '(//div[contains(@class, "complaint-origin-all")]//a)',
      complaintOriginOfficer: '(//div[contains(@class, "complaint-origin-officer")]//a)',
      complaintOriginCivilian: '(//div[contains(@class, "complaint-origin-civilian")]//a)',
      complaintOriginSelected: '(//a[contains(@class, "complaint-origin-option selected")])',
      tooltip: '(//div[contains(@class, "test--graph-tooltip")]//span)',
      biggestGraphNode: '(//*[@r="7"])',
      anotherGraphNode: '(//*[@r="2.5" and contains(@style, "rgb(244, 162, 152)")])',
      mainTabs: '(//div[contains(@class, "main-tabs")])',
      geographicTab: '(//div[contains(@class, "geographic-btn")])',
      networkTab: '(//div[contains(@class, "social-graph-btn")])',
      leftSection: '(//div[contains(@class, "left-section")])',
      rightSection: '(//div[contains(@class, "right-section")])',
      rightPaneSectionMenu: '(//div[@class="right-pane-section-menu"])',
      timelineTab: '(//span[contains(@class, "right-pane-tab-name")])[1]',
      officerTab: '(//span[contains(@class, "right-pane-tab-name")])[2]',
      officerTimelineSection: '(//div[contains(@class, "test--officer-timeline")])',
      selectedNodeLabel: '(//*[@class="selected-node-label"])',
      officerTip: '(//div[contains(@class, "test--graph-tooltip")])',
      firstCurrentEdge: '(//*[contains(@class, "link-group-color-4 current-link")])',
      secondCurrentEdge: '(//*[contains(@class, "link-group-color-5 current-link")])',
      selectedEdgeLabel: '(//*[@class="selected-edge-label"])',
      edgeCoaccusalsHeader: '(//div[@class="edge-coaccusals-pane-header"])',
      toggleSidebarsButton: '(//div[contains(@class, "toggle-sidebars-btn")])',
      backToPinboardButton: '(//a[@class="back-to-pinboard-link"])',
    });
  }

  graphNodes() {
    return $$('(//*[name()="circle" and contains(@class, "node")])');
  }

  graphLinks() {
    return $$('(//*[name()="line" and contains(@class, "link")])');
  }

  graphLabels() {
    return $$('(//*[name()="text" and @class="node-label"])');
  }
}

class GeographicSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      complaintText: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      trrText: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      complaintNumber: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      trrNumber: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
    });
  }
}

class OfficersSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstOfficerRow: '//div[contains(@class, "officer-row")][1]',
      officerName: '//h1[contains(@class, "test--officer-name")]',
    });
  }

  officerRows() {
    return $$('//div[contains(@class, "officer-row")]');
  }
}

class TimelineSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      allegationRow: '//div[contains(@class, "item__item")]',
      allegationItem: '//div[contains(@class, "item__item")][7]',
      firstYearItem: '//div[contains(@class, "item__item")][1]//div[@class="date"]',
      firstAllegationItem: '//div[contains(@class, "item__item")][2]',
      firstAllegationCategory: '//div[contains(@class, "item__item")][2]//div[@class="category"]',
      firstAllegationSubcategory: '//div[contains(@class, "item__item")][2]//div[@class="subcategory"]',
      firstAllegationDate: '//div[contains(@class, "item__item")][2]//span[@class="date"]',
      timelineItemDateActive: '//div[contains(@class, "timeline__timeline")]//div[contains(@class, "active")]' +
        '//span[@class="date"]',
    });
  }
}

class PreviewPaneSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      previewPane: '//div[contains(@class, "preview-pane")]',
      officerPreviewPaneName: '//h1[contains(@class, "test--officer-name")]',
      edgePreviewPaneHeader: '(//div[@class="edge-coaccusals-pane-header"])',
      crPreviewPaneTitle: '//div[contains(@class, "cr-preview-pane-title-title")]',
      crPreviewPaneSubtitle: '//div[contains(@class, "cr-preview-pane-title-subtitle")]',
    });
  }

  edgeCoaccusalsItems() {
    return $$('//div[contains(@class, "item__item")]');
  }
}

class SocialGraphPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeographicSection();
  officersSection = new OfficersSection();
  timelineSection = new TimelineSection();
  previewPaneSection = new PreviewPaneSection();

  open(params='?unit_id=123&title=Live test social graph title') {
    super.open(`/social-graph/${params}`);
  }
}

module.exports = new SocialGraphPage();
