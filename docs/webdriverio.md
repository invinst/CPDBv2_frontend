# WebdriverIO testing guide

We use WebdriverIO to drive our selenium tests.

## Writing page objects

We used [Page Object Pattern](http://webdriver.io/guide/testrunner/pageobjects.html#description) to abstract the page 
information and make the test easier to read and write.

We wrote a base class called `Section` which contains `prepareElementGetters` method to help look up and return the 
element by using 
[Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
Our `Section` has the ability to automatically build a linked selector using `parentSelector` and `mainElementSelector`, 
which results in a more precise and reliable one. A section can be selected using `yourSection.mainElement`.

Example:
```javascript
class Logo extends Header {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "logo")]');
    this.prepareElementGetters();
  }
}

export default class Header extends Section {
  constructor(parentSelector, mainElementSelector) {
    super(parentSelector, mainElementSelector);
    this.prepareElementGetters({
      logo: Logo,
    });
  }
}

class SlimHeader extends Header {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "slim-header")]');
    this.prepareElementGetters({
      navBar: '//div[contains(@class, "navBar")]',
    });
  }
}

class TopHeader extends Header {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "top-header")]');
    this.prepareElementGetters({
      navBar: '//div[contains(@class, "navBar")]',
    });
  }
}

class OldStyleLandingPage extends Page {
  slimHeader = new SlimHeader();
  topHeader = new TopHeader();
}

class LandingPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      slimHeader: SlimHeader,
      topHeader: TopHeader,
    });
  }
}

const landingPage = new LandingPage()
landingPage.topHeader.logo.selector.should.eql('//div[contains(@class, "top-header")]//div[contains(@class, "logo")]')
landingPage.slimHeader.logo.selector.should.eql('//div[contains(@class, "slim-header")]//div[contains(@class, "logo")]')

```

## Writing tests

We need to create a file named `test-{page-name}.js` under selenium-test folder

Example:
```javascript
//selenium-test/test-officer-page.js

require('should');

import officerPage from './page-objects/officer-page';


describe('officer summary page', function () {
    it('should display officer summary', function () {
        officerPage.open('/officer/1234/');
        officerPage.summarySection.officerName.waitForVisible();
    });
});

```

## Configuration

The configuration file `wdio.conf.js` contains all necessary information to run your test suite. It is a node module that exports a JSON. Here is some common configuration:

- `specs`: Specify which file should run. We can replace wildcard pattern to run a specific file rather than multiple files.
- `sync`: By default WebdriverIO commands are executed in a synchronous way using the wdio-sync package. If you still want to run your tests in an async way e.g. using promises you can set the sync option to false.
- `maxInstances`: File is the unit of parallel when running WebdriverIO tests. This define the maximum number of files to test simultaneously.
