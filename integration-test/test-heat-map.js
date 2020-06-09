'use strict';

import 'should';

import landingPage from './page-objects/landing-page';


describe('Heat map', function () {
  beforeEach(function () {
    landingPage.open();
  });

  describe('summary panel', function () {
    it('should display city summary', function () {
      landingPage.heatMapSection.citySummary.header.getText().should.equal('CHICAGO 1988 - 2017');
      landingPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql('10 allegations');
      landingPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql('50% disciplined');
    });

    it('should reveal dropdown when click on placeholder', function () {
      landingPage.heatMapSection.dropdownPlaceholder.click();
      landingPage.heatMapSection.dropdown.dropdownItems.waitForDisplayed();
      landingPage.heatMapSection.dropdown.dropdownItems.count.should.eql(10);
      landingPage.heatMapSection.dropdown.textInput.isFocused().should.be.true();
    });

    it('should go to /search/ when click on link in placeholder', function () {
      landingPage.heatMapSection.searchTermsLink.click();
      browser.getUrl().should.match(/\/search\/$/);
    });

    it('should go to v1 complain category when click on the complaints', function () {
      $$(landingPage.heatMapSection.complaintCategory.selector)[0].click();
      browser.switchWindow('/url-mediator/session-builder');
      browser.getUrl().should.match(/\/url-mediator\/session-builder\?cat__category=/);
      browser.closeWindow();
      browser.switchWindow('localhost');
    });

    it('should go to v1 datatool when click on allegation count', function () {
      const v2Url = browser.getUrl();
      landingPage.pinboardIntroduction.body.waitForDisplayed();
      landingPage.pinboardIntroduction.closeButton.click();
      landingPage.heatMapSection.citySummary.allegationDiscipline.click();
      browser.switchWindow('cpdb');
      browser.getUrl().should.not.equal(v2Url);
      browser.closeWindow();
      browser.switchWindow('localhost');
    });

    context('dropdown revealed', function () {
      beforeEach(function () {
        landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed();
        if ($$(landingPage.pinboardIntroduction.body.selector).length > 0) {
          landingPage.pinboardIntroduction.closeButton.click();
          landingPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
        }
        landingPage.heatMapSection.dropdownPlaceholder.click();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForDisplayed();
        landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed(1000, true);
        browser.pause(400); // wait for the animation end to avoid miss-click. The stiffness is 300
      });

      it('should show community detail if click on a community', function () {
        $$(landingPage.heatMapSection.dropdown.dropdownItems.selector)[0].click();
        landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForDisplayed();
        landingPage.heatMapSection.communityDetail.allegationDiscipline.getText()
          .should.containEql('5 allegations');
        landingPage.heatMapSection.communityDetail.allegationDiscipline.getText()
          .should.containEql('2 disciplines');
      });

      it('should show first community if hit enter', function () {
        browser.keys('\uE007'); // Hit Enter
        landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForDisplayed();
      });

      it('should show only community that match with entered text', function () {
        landingPage.heatMapSection.dropdown.textInput.setValue('Hyde');
        landingPage.heatMapSection.dropdown.dropdownItems.count.should.eql(1);
        landingPage.heatMapSection.dropdown.dropdownItems.getText().should.containEql('Hyde Park');
      });

      it('should change back if click on city summary', function () {
        landingPage.heatMapSection.citySummary.tapBottom();
        landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForDisplayed(1000, true);
      });

      it('should change back if click on up arrow', function () {
        landingPage.heatMapSection.dropdown.dropdownUpArrow.click();
        landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed();
        landingPage.heatMapSection.dropdown.dropdownItems.waitForDisplayed(1000, true);
      });

      context('community selected', function () {
        beforeEach(function () {
          if ($$(landingPage.pinboardIntroduction.body.selector).length > 0) {
            landingPage.pinboardIntroduction.closeButton.click();
            landingPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
          }
          $$(landingPage.heatMapSection.dropdown.dropdownItems.selector)[0].click();
          landingPage.heatMapSection.dropdown.dropdownItems.waitForDisplayed(20000, true);
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForDisplayed();
        });

        it('should change back if click on city summary', function () {
          landingPage.heatMapSection.citySummary.tapBottom();
          landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForDisplayed(20000, true);
        });

        it('should change back if click on x button', function () {
          landingPage.heatMapSection.communityDetail.closeBtn.click();
          landingPage.heatMapSection.dropdownPlaceholder.waitForDisplayed();
          landingPage.heatMapSection.communityDetail.allegationDiscipline.waitForDisplayed(2500, true);
        });

        it('should navigate to officer detail page when click on officer item', function () {
          landingPage.heatMapSection.communityDetail.firstOfficer.click();
          browser.getUrl().should.match(/\/officer\/1\/[-a-z]+\/$/);
        });

        it('should navigate to v1 data tool when click on See More button', function () {
          landingPage.heatMapSection.communityDetail.v1Link.click();
          browser.switchWindow('/url-mediator/session-builder');
          browser.getUrl().should.match(/\/url-mediator\/session-builder\?community=/);
          browser.closeWindow();
          browser.switchWindow('localhost');
        });
      });
    });
  });
});
