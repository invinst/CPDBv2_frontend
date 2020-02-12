import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import HoverableRequestDocumentButton, {
  RequestDocumentButton,
} from 'components/common/request-document-button';


describe('RequestDocumentButton component', function () {
  it('should render "Request Documents" if not alreadyRequested', function () {
    const wrapper = shallow(<HoverableRequestDocumentButton alreadyRequested={ false }/>);
    wrapper.text().should.containEql('Request Documents');
  });

  it('should render "New Document Notifications" if not alreadyRequested and hasData', function () {
    const wrapper = shallow(<HoverableRequestDocumentButton alreadyRequested={ false } hasData={ true }/>);
    wrapper.text().should.containEql('New Document Notifications');
  });

  it('should render "Documents Requested" if alreadyRequested', function () {
    const wrapper = shallow(<HoverableRequestDocumentButton alreadyRequested={ true }/>);
    wrapper.text().should.containEql('Documents Requested');
  });

  it('should call openRequestDocumentModal when clicked on', function () {
    const func = spy();
    const wrapper = mount(
      <HoverableRequestDocumentButton alreadyRequested={ false } openRequestDocumentModal={ func }/>
    );
    const instance = wrapper.find(RequestDocumentButton);

    instance.simulate('click');
    func.should.be.called();
  });

  it('should do nothing when clicked on if the document is requested', function () {
    const func = spy();
    const wrapper = mount(
      <HoverableRequestDocumentButton alreadyRequested={ true } openRequestDocumentModal={ func }/>
    );
    const instance = wrapper.find(RequestDocumentButton);

    instance.simulate('click');
    func.called.should.be.false();
  });
});
