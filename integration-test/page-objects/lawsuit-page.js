import Page from './page';
import Section from './sections/section';

class SummarySection extends Section {
  constructor() {
    super('', '//*[contains(@class, "summary-section")]');

    this.prepareElementGetters({
      content: '(//div[contains(@class, "summary-info")] //div)[2]',
      showMoreButton: '//div[contains(@class, "show-more-button-container")]',
      attachmentImage: '//div[contains(@class, "attachment-image")]',
      attachmentImageHref: '//div[contains(@class, "attachment-image-href")]',
    });
  }
}

class InvolvedOfficerCard extends Section {
  constructor(index) {
    super(
      '',
      `(//*[contains(@class, "involved-officer-card__involved-officer-card")])[${index + 1}]`
    );

    this.prepareElementGetters({
      rank: '//p[contains(@class, "officer-card-rank")]',
      name: '//p[contains(@class, "officer-card-name")]',
      metric: '//span[@class="test--officer-card-metric"]',
      percentile: '//p[contains(@class, "test--officer-card-percentile")]',
      demographic: '//div[contains(@class, "officer-card-demographic")]',
      totalPayments: '//div[contains(@class, "officer-total-payments-value")]',
      totalLawsuits: '//div[contains(@class, "officer-total-lawsuits")]',
      pinButton: '//div[contains(@class, "item-pin-button__item-pin-button")]',
    });
  }
}

class InvolvedOfficersSection extends Section {
  firstCard = new InvolvedOfficerCard(0);

  constructor() {
    super('', '//div[contains(@class, "involved-officers")]');

    this.prepareElementGetters({
      card: '//a[contains(@class, "involved-officer-card")]',
      lastCard: '(//a[contains(@class, "involved-officer-card")])[last()]',
      showMoreButton: '//div[contains(@class, "show-more-button-container")]',
      firstRadarChart: '//p[contains(@class, "officer-card-name") and text()="Joseph Nega"]' +
        '/../..//*[name()="svg"]',
    });
  }
}

class PaymentSection extends Section {
  constructor() {
    super('', '//*[contains(@class, "payment-section")]');

    this.prepareElementGetters({
      detailRowSettlements: '.detail-row .settlement',
      detailRowLegalFees: '.detail-row .legal-fees',
      subtotalsSettlements: '//*[contains(@class, "subtotals")] //*[contains(@class, "settlement")]',
      subtotalsLegalFees: '//*[contains(@class, "subtotals")] //*[contains(@class, "legal-fees")]',
      totalsRowValue: '//*[contains(@class, "total-payments-value")]',
    });
  }
}

class CaseBreakdownSection extends Section {
  constructor() {
    super('', '//*[contains(@class, "case-breakdown-section")]');

    this.prepareElementGetters({
      interaction: '(//*[contains(@class, "field-row-value")])[1]',
      service: '(//*[contains(@class, "field-row-value")])[2]',
      misconduct: '(//*[contains(@class, "field-row-value")])[3]',
      violence: '(//*[contains(@class, "field-row-value")])[4]',
      outcome: '(//*[contains(@class, "field-row-value")])[5]',
    });
  }
}

class CaseDetailsSection extends Section {
  constructor() {
    super('', '//*[contains(@class, "case-details-section")]');

    this.prepareElementGetters({
      plaintiffs: '(//*[contains(@class, "field-row-value")])[1]',
      incidentDate: '(//*[contains(@class, "field-row-value")])[2]',
      location: '(//*[contains(@class, "field-row-value")])[3]',
    });
  }
}

class LawsuitPage extends Page {
  summary = new SummarySection();
  payment = new PaymentSection();
  caseBreakdown = new CaseBreakdownSection();
  caseDetails = new CaseDetailsSection();
  involvedOfficers = new InvolvedOfficersSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.case-no',
      primaryCause: '.primary-cause',
      pinButton: '.shareable-header-nav-bar div.pin-button',
      totalPaymentsValue: '.total-payments-summary-value',
      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      landingPageBreadCrumb: '//a[contains(@class, "breadcrumb-item") and .="cpdp"]',
    });
  }

  open(id = '00-L-5230') {
    super.open(`/lawsuit/${id}/`);
  }
}

module.exports = new LawsuitPage();
