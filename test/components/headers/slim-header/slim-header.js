import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { spy, stub } from 'sinon';
import { Link, MemoryRouter } from 'react-router-dom';

import { SlimHeader } from 'components/headers/slim-header';
import * as domUtils from 'utils/dom';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';
import { RichTextFieldFactory } from 'utils/test/factories/field';
import EditModeProviderContainer from 'containers/edit-mode-provider-container';


describe('SlimHeader component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {},
    cms: {
      pages: {
        'landing-page': {
          fields: {
            'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' }),
          },
        },
      },
    },
    landingPage: {
      heatMap: {},
    },
    headers: {
      slimHeader: {
        logoSectionEditModeOn: false,
        demoVideoSectionEditModeOn: false,
        videoInfo: [{
          'thumbnail_small': 'https://i.vimeocdn.com/video/797111186_100x75.webp',
        }],
      },
    },
    pathname: '/',
    pinboardIntroduction: {
      isPinButtonIntroductionVisited: false,
    },
  });

  beforeEach(function () {
    window.scrollTo(0, 0);
    stub(window, 'addEventListener');
    stub(window, 'removeEventListener');
  });

  it('should render nothing if "show" prop is false', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <EditModeProviderContainer>
            <SlimHeader show={ false } />
          </EditModeProviderContainer>
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.test--slim-header').exists().should.be.false();
  });

  it('should render Q&A link', function () {
    const openRequestDocumentModal = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <EditModeProviderContainer>
            <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
          </EditModeProviderContainer>
        </MemoryRouter>
      </Provider>
    );

    const links = wrapper.find('a');
    const link = links.filter({ children: 'Q&A' });
    link.prop('href').should.equal('http://how.cpdp.works/');
  });

  it('should render Data link', function () {
    const openRequestDocumentModal = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <EditModeProviderContainer>
            <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
          </EditModeProviderContainer>
        </MemoryRouter>
      </Provider>
    );

    const links = wrapper.find('a');
    const link = links.filter({ children: 'Data Tool (1988-2018)' });
    link.prop('href').should.equal('http://cpdb.lvh.me');
  });

  it('should render Documents link', function () {
    const openRequestDocumentModal = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <EditModeProviderContainer>
            <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/'/>
          </EditModeProviderContainer>
        </MemoryRouter>
      </Provider>,
    );

    const links = wrapper.find(Link);
    const link = links.findWhere(link => link.prop('to') === '/documents/');
    link.text().should.equal('Documents');
  });

  describe('recalculatePosition', function () {
    beforeEach(function () {
      stub(domUtils, 'calculateSlimHeaderPosition');
      this.slimHeader = shallow(
        <SlimHeader show={ true } pathname='/' />
      );
    });

    it('should remain in top position', function () {
      domUtils.calculateSlimHeaderPosition.returns('top');
      this.slimHeader.instance().recalculatePosition();
      this.slimHeader.state('position').should.equal('top');
    });

    it('should transition to middle position', function () {
      domUtils.calculateSlimHeaderPosition.returns('middle');
      this.slimHeader.instance().recalculatePosition();
      this.slimHeader.state('position').should.equal('middle');
    });

    it('should transition to bottom position', function () {
      domUtils.calculateSlimHeaderPosition.returns('bottom');
      this.slimHeader.instance().recalculatePosition();
      this.slimHeader.state('position').should.equal('bottom');
    });
  });

  describe('SlimHeaderContent', function () {
    it('should be rendered with correct props and style on the top of the page', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <EditModeProviderContainer>
              <SlimHeader
                show={ true }
                pathname='/'
              />
            </EditModeProviderContainer>
          </MemoryRouter>
        </Provider>
      );
      wrapper.setState({ position: 'top' });

      const slimHeaderContent = wrapper.find(SlimHeaderContent);
      slimHeaderContent.prop('position').should.equal('top');
      slimHeaderContent.prop('pathname').should.equal('/');
      slimHeaderContent.prop('editModeOn').should.be.false();
    });

    it('should be rendered with correct props and style in the middle of the page', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <EditModeProviderContainer>
              <SlimHeader
                show={ true }
                pathname='/'
              />
            </EditModeProviderContainer>
          </MemoryRouter>
        </Provider>
      );
      wrapper.find(SlimHeader).setState({ position: 'middle' });

      const slimHeaderContent = wrapper.find(SlimHeaderContent);
      slimHeaderContent.prop('position').should.equal('middle');
      slimHeaderContent.prop('pathname').should.equal('/');
      slimHeaderContent.prop('editModeOn').should.be.false();
    });

    it('should be rendered with correct props and style in the bottom of the page', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <EditModeProviderContainer>
              <SlimHeader
                show={ true }
                pathname='/'
              />
            </EditModeProviderContainer>
          </MemoryRouter>
        </Provider>
      );

      wrapper.find(SlimHeader).setState({ position: 'bottom' });
      const slimHeaderContent = wrapper.find(SlimHeaderContent);
      slimHeaderContent.prop('position').should.equal('bottom');
      slimHeaderContent.prop('pathname').should.equal('/');
      slimHeaderContent.prop('editModeOn').should.eql(false);
    });
  });
});
