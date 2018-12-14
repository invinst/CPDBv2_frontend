import React from 'react';

import MarkerTooltip from 'components/officer-page/tabbed-pane-section/map/marker-tooltip';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';


describe('MarkerTooltip component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render marker tooltip correctly', function () {
    instance = renderIntoDocument(
      <MarkerTooltip
        kind={ 'CR' }
        id={ '12345' }
        category={ 'test category' }
        coaccused={ 5 }
        victims={ [{
          'gender': 'male',
          'race': 'White',
          'age': 35
        }, {
          'gender': 'female',
          'race': 'Black',
          'age': 42
        }] }
      />
    );
    const tooltipKindId = scryRenderedDOMComponentsWithClass(instance, 'marker-tooltip-title')[0];
    const tooltipCategory = scryRenderedDOMComponentsWithClass(instance, 'marker-tooltip-category')[0];
    const tooltipCoaccused = findRenderedDOMComponentWithClass(instance, 'marker-tooltip-footer');
    const tooltipVictims = scryRenderedDOMComponentsWithClass(instance, 'test--marker-tooltip-victim');
    tooltipKindId.textContent.should.eql('CR 12345');
    tooltipCategory.textContent.should.eql('test category');
    tooltipCoaccused.textContent.should.eql('Accused with 5 others');
    tooltipVictims[0].textContent.should.eql('White male age 35');
    tooltipVictims[1].textContent.should.eql('Black female age 42');
  });

  it('should not render age and race of victim if they are null', function () {
    instance = renderIntoDocument(
      <MarkerTooltip
        victims={ [{
          'gender': 'male',
          'race': 'Unknown',
          'age': 35
        }, {
          'gender': 'female',
          'race': 'Black',
          'age': null
        }] }
      />
    );
    const tooltipVictims = scryRenderedDOMComponentsWithClass(instance, 'test--marker-tooltip-victim');
    tooltipVictims[0].textContent.should.eql('male age 35');
    tooltipVictims[1].textContent.should.eql('Black female ');
  });

  it('should not render victim if there are no victims', function () {
    instance = renderIntoDocument(<MarkerTooltip victims={ [] } />);
    const tooltipVictims = scryRenderedDOMComponentsWithClass(instance, 'test--marker-tooltip-victim');
    tooltipVictims.should.have.length(0);
  });
});
