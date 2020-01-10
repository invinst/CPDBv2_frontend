import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router';
import { Context as ResponsiveContext } from 'react-responsive';

import Logo from 'components/headers/slim-header/slim-header-content/logo';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import styles from 'components/headers/slim-header/slim-header-content/logo.sass';


describe('Logo component', function () {
  it('should have correct class name', function () {
    const wrapper = shallow(
      <Logo position='top'/>
    );

    const hoverableEditWrapper = wrapper.find(HoverableEditWrapper);
    hoverableEditWrapper.prop('className').should.equal(`${styles.logo} top`);
  });

  it('should render LinkTextEditable when screen width greater than 830', function () {
    const wrapper = mount(
      <ResponsiveContext.Provider value={ { width: 831 } }>
        <Logo position='top'/>
      </ResponsiveContext.Provider>
    );

    const linkTextEditable = wrapper.find(LinkTextEditable);
    linkTextEditable.prop('className').should.equal('header-logo-title');
    linkTextEditable.prop('placeholder').should.equal('Title');
    linkTextEditable.prop('to').should.equal('/');
    linkTextEditable.prop('fieldname').should.equal('navbar_title');
  });

  it('should render Link when screen width smaller than 830', function () {
    const wrapper = mount(
      <ResponsiveContext.Provider value={ { width: 829 } }>
        <Logo position='top'/>
      </ResponsiveContext.Provider>
    );

    const link = wrapper.find(Link);
    link.prop('className').should.equal('header-logo-title');
    link.prop('to').should.equal('/');
    link.prop('children').should.equal('CPDP');
  });

  it('should render navbar subtitle when screen width greater than 950', function () {
    const wrapper = mount(
      <ResponsiveContext.Provider value={ { width: 951 } }>
        <Logo position='top'/>
      </ResponsiveContext.Provider>
    );

    const richTextEditable = wrapper.find(RichTextEditable);
    richTextEditable.prop('className').should.equal('header-logo-subtitle');
    richTextEditable.prop('placeholder').should.equal('Subtitle');
    richTextEditable.prop('fieldname').should.equal('navbar_subtitle');
  });

  it('should not render navbar subtitle when screen width smaller than 950', function () {
    const wrapper = mount(
      <ResponsiveContext.Provider value={ { width: 949 } }>
        <Logo position='top'/>
      </ResponsiveContext.Provider>
    );

    wrapper.find(RichTextEditable).exists().should.be.false();
  });
});
