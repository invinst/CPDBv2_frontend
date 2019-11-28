import React from 'react';
import { shallow } from 'enzyme';

import Counter from 'components/documents-overview-page/document-row/counter';


describe('DocumentsOverviewPage Counter component', function () {
  it('should render counts', function () {
    const wrapper = shallow(
      <Counter viewsCount={ 3000 } downloadsCount={ 20000 }/>
    );

    wrapper.find('.view-count').text().should.equal('3,000');
    wrapper.find('.download-count').text().should.equal('20,000');
  });
});
