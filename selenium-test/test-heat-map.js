'use strict';

import 'should';

import landingPage from './page-objects/landing-page';


describe('Heat map', function () {
  beforeEach(function () {
    landingPage.open();
  });

  describe('summary panel', function () {
    it('should display city summary', function () {
      landingPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql('10 allegations');
      landingPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql('50% disciplined');
    });

    it('should reveal dropdown when click on placeholder', function () {
      landingPage.heatMapSection.dropdownPlaceholder.click();
      landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible();
      landingPage.heatMapSection.dropdown.dropdownItems.count.should.eql(10);
      browser.hasFocus(landingPage.heatMapSection.dropdown.textInput.selector);
    });

    it('should go to /search/terms/ when click on link in placeholder', function () {
      landingPage.heatMapSection.searchTermsLink.click();
      browser.getUrl().should.match(/\/search\/terms\/$/);
    });

    it('should go to v1 complain category when click on the complaints', function () {
      browser.elements(landingPage.heatMapSection.complaintCategory.selector).value[0].click();
      browser.getUrl().should.match(/\/url-mediator\/session-builder\?cat__category=/);
    });

    it('should go to v1 datatool when click on allegation count', function () {
      const v2Url = browser.getUrl();
      landingPage.heatMapSection.citySummary.allegationDiscipline.click();
      browser.getUrl().should.not.equal(v2Url);
    });

    context('dropdown revealed', function () {
      beforeEach(function () {
        landingPage.heatMapSection.dropdownPlaceholder.click();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible();
        landingPage.heatMapSection.dropdownPlaceholder.waitForVisible(1000, true);
      });

      it('should show community detail if click on a community', function () {
        browser.elements(landingPage.heatMapSection.dropdown.dropdownItems.selector).value[0].click();
        landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible();
        landingPage.heatMapSection.communityDetail.allegationDiscipline.getText()
          .should.containEql('5 allegations');
        landingPage.heatMapSection.communityDetail.allegationDiscipline.getText()
          .should.containEql('2 disciplines');
      });

      it('should show first community if hit enter', function () {
        browser.keys('\uE007'); // Hit Enter
        landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible();
      });

      it('should show only community that match with entered text', function () {
        landingPage.heatMapSection.dropdown.textInput.setValue('Hyde');
        landingPage.heatMapSection.dropdown.dropdownItems.count.should.eql(1);
        landingPage.heatMapSection.dropdown.dropdownItems.getText().should.containEql('Hyde Park');
      });

      it('should change back if click on city summary', function () {
        landingPage.heatMapSection.citySummary.tapBottom();
        landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible(1000, true);
      });

      it('should change back if click on up arrow', function () {
        landingPage.heatMapSection.dropdown.dropdownUpArrow.click();
        landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible(1000, true);
      });

      context('community selected', function () {
        beforeEach(function () {
          browser.elements(landingPage.heatMapSection.dropdown.dropdownItems.selector).value[0].click();
          landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible(20000, true);
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible();
        });

        it('should change back if click on city summary', function () {
          landingPage.heatMapSection.citySummary.tapBottom();
          landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible(20000, true);
        });

        it('should change back if click on x button', function () {
          landingPage.heatMapSection.communityDetail.closeBtn.click();
          landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible(2500, true);
        });

        it('should navigate to officer detail page when click on officer item', function () {
          browser.elements(landingPage.heatMapSection.communityDetail.officers.selector).value[0].click();
          browser.getUrl().should.match(/\/officer\/1\/$/);
        });

        it('should navigate to v1 data tool when click on See More button', function () {
          landingPage.heatMapSection.communityDetail.v1Link.click();
          browser.getUrl().should.match(/\/url-mediator\/session-builder\?community=/);
        });
      });
    });
  });
});
