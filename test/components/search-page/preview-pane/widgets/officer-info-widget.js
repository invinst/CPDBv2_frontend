import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import { OfficerInfoWidget } from 'components/search-page/preview-pane/widgets';


describe('OfficerInfoWidget component', () => {
  let instance;

  it('should display officer info', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        birthYear={ 1981 }
        age={ 37 }
        badge={ 23 }
        unit={ { id: 1, unitName: '018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    findRenderedDOMComponentWithTag(instance, 'h1').textContent.should.eql('Timothy Parker');
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem[0].textContent.should.eql('37 year old (b. 1981), white, male.');
    listItem[1].textContent.should.containEql('23');
    listItem[2].textContent.should.containEql('Police Officer');
    listItem[3].textContent.should.containEql('018');
    listItem[4].textContent.should.containEql('JAN 7, 2017 — Present');
  });

  it('should contain resignation date when resignationDate is not null', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        birthYear={ 1981 }
        age={ 1 }
        badge={ 23 }
        unit={ { id: 1, description: 'District 003' } }
        appointedDate='JAN 7, 2017'
        resignationDate='JAN 8, 2018'
      />
    );
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem[4].textContent.should.containEql('JAN 7, 2017 — JAN 8, 2018');
  });
});
