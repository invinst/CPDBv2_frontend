import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "social-graph-title")])',
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      coaccusalsThresholdSlider: '(//div[@class="coaccusals-threshold-slider-container"]' +
        '//div[contains(@class, "coaccusals-threshold-slider")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      showCivilComplaintOnlyCheckbox: '(//input[@class="test--show-civil-complaint-checkbox"])',
      tooltip: '(//div[contains(@class, "test--graph-tooltip")]//span)',
      biggestGraphNode: '(//*[@r="7"])',
      anotherGraphNode: '(//*[@r="2.5" and contains(@style, "rgb(244, 162, 152)")])',
      mainTabs: '(//div[contains(@class, "main-tabs")])',
      geographicTab: '(//div[contains(@class, "geographic-btn")])',
      networkTab: '(//div[contains(@class, "social-graph-btn")])',
      leftSection: '(//div[contains(@class, "left-section")])',
      rightPaneSectionMenu: '(//div[@class="right-pane-section-menu"])',
      timelineTab: '(//span[contains(@class, "right-pane-tab-name")])[1]',
      officerTab: '(//span[contains(@class, "right-pane-tab-name")])[2]',
      officerTimelineSection: '(//div[contains(@class, "test--officer-timeline")])',
      selectedNodeLabel: '(//*[@class="selected-node-label"])',
      officerTip: '(//div[contains(@class, "test--graph-tooltip")])',
      firstCurrentEdge: '(//*[contains(@class, "link-group-color-4 current-link")])',
      secondCurrentEdge: '(//*[contains(@class, "link-group-color-5 current-link")])',
      selectedEdgeLabel: '(//*[@class="selected-edge-label"])',
    });
  }

  graphNodes() {
    return browser.elements('(//*[name()="circle" and contains(@class, "node")])').value;
  }

  graphLinks() {
    return browser.elements('(//*[name()="line" and contains(@class, "link")])').value;
  }

  graphLabels() {
    return browser.elements('(//*[name()="text" and @class="node-label"])').value;
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

  officerRowCount() {
    return browser.elements('//div[contains(@class, "officer-row")]').value.length;
  }
}

class TimelineSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
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

  allegationRowCount() {
    return browser.elements('//div[contains(@class, "item__item")]').value.length;
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
    return browser.elements('//div[contains(@class, "item__item")]').value;
  }
}

class SocialGraphPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeographicSection();
  officersSection = new OfficersSection();
  timelineSection = new TimelineSection();
  previewPaneSection = new PreviewPaneSection();

  open() {
    super.open('/social-graph/?unit_id=123&title=Live test social graph title');
  }
}

module.exports = new SocialGraphPage();
