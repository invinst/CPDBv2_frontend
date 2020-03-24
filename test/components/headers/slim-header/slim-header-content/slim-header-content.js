import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { stub } from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import * as DomUtils from 'utils/dom';
import LogOutButton from 'components/log-out-button';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';
import Logo from 'components/headers/slim-header/slim-header-content/logo';
import DemoVideo from 'components/headers/slim-header/slim-header-content/demo-video';
import RightLinks from 'components/headers/slim-header/slim-header-content/right-links';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';


describe('SlimHeaderContent component', function () {
  const storeMock = MockStore()({
    authentication: {},
    cms: {
      pages: {},
    },
    headers: {
      slimHeader: {
        logoSectionEditModeOn: false,
        demoVideoSectionEditModeOn: false,
      },
    },
    pathname: '/',
  });

  it('should render correctly', function () {
    const wrapper = mount(
      <Provider store={ storeMock } >
        <MemoryRouter>
          <SlimHeaderContent
            position='top'
            pathname='/'
            editModeOn={ false }
            disableTop={ false }
          />
        </MemoryRouter>
      </Provider>
    );

    const header = wrapper.find(SlimHeaderContent);

    const logo = header.find(Logo);
    logo.prop('position').should.equal('top');
    logo.prop('editModeOn').should.be.false();

    const demoVideo = header.find(DemoVideo);
    demoVideo.prop('position').should.equal('top');
    demoVideo.prop('editModeOn').should.be.false();

    header.find(LogOutButton).exists().should.be.true();

    header.find(RightLinks).prop('position').should.equal('top');
    header.find(SearchBox).prop('position').should.equal('top');
  });

  it('should scroll to top when being clicked and position is bottom', function () {
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    const wrapper = shallow(
      <SlimHeaderContent position='bottom'/>
    );

    wrapper.simulate('click');

    scrollToTopStub.should.be.calledOnce();
  });

  it('should not scroll to top when being clicked if position is not bottom', function () {
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    const wrapper = shallow(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='top'/>
      </Provider>
    );

    const header = wrapper.find(SlimHeaderContent);
    header.simulate('click');

    scrollToTopStub.should.not.be.called();
  });
});
