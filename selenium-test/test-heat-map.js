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
      landingPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql('5 disciplines');
    });

    it('should reveal dropdown when click on placeholder', function () {
      landingPage.heatMapSection.dropdownPlaceholder.click();
      landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible();
      landingPage.heatMapSection.dropdown.dropdownItems.count.should.eql(10);
    });

    it('should go to /search/terms/ when click on link in placeholder', function () {
      landingPage.heatMapSection.searchTermsLink.click();
      browser.getUrl().should.match(/\/search\/terms\/$/);
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
          landingPage.heatMapSection.dropdown.dropdownItems.waitForVisible(2500, true);
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible();
        });

        it('should change back if click on city summary', function () {
          landingPage.heatMapSection.citySummary.tapBottom();
          landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible(2500, true);
        });

        it('should change back if click on x button', function () {
          landingPage.heatMapSection.communityDetail.closeBtn.click();
          landingPage.heatMapSection.dropdownPlaceholder.waitForVisible();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForVisible(2500, true);
        });

        it('should navigate to officer detail page when click on officer item', function () {
          browser.elements(landingPage.heatMapSection.communityDetail.officers.selector).value[0].click();
          browser.getUrl().should.match(/\/officer\/2\/$/);
        });

        it('should navigate to v1 data tool when click on See More button', function () {
          landingPage.heatMapSection.communityDetail.v1Link.click();
          browser.getUrl().should.match(/\/url-mediator\/session-builder\?community=/);
        });
      });
    });
  });
});
