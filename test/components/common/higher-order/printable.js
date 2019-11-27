import React, { Component, PropTypes } from 'react';
import { shallow, mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';

import Printable from 'components/common/higher-order/printable';


describe('Printable component', function () {
  class Dummy extends Component {
    render() {
      return <div />;
    }
  }

  Dummy.propTypes = {
    printHeader: PropTypes.string,
  };

  const PrintableDummy = Printable(Dummy);

  it('should render header correctly', function () {
    const clock = useFakeTimers(new Date(2018, 9, 27));

    const wrapper = shallow(<PrintableDummy printHeader='Dummy title'/>);
    const instance = wrapper.instance();
    instance._mediaPrintListener({ matches: true });
    wrapper.find('.left-header').text().should.equal('Dummy title');
    wrapper.find('.printable-as-of').text().should.equal('AS OF');
    wrapper.find('.printable-date').text().should.equal('10/27/2018');

    clock.restore();
  });

  it('should add media listener', function () {
    const addListenerSpy = spy();
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: true,
          addListener: addListenerSpy,
        };
      },
    });

    const wrapper = mount(<PrintableDummy/>);
    const instance = wrapper.instance();
    addListenerSpy.should.be.calledWith(instance._mediaPrintListener);
  });

  it('should add onbeforeprint & onafterprint listener', function () {
    const wrapper = shallow(<PrintableDummy/>);
    const instance = wrapper.instance();
    window.onbeforeprint.should.be.eql(instance._beforePrint);
    window.onafterprint.should.be.eql(instance._afterPrint);
  });

  it('should set printMode state when _mediaPrintListener is called', function () {
    const wrapper = shallow(<PrintableDummy/>);
    const instance = wrapper.instance();

    instance._mediaPrintListener({ matches: true });
    instance.state.printMode.should.be.true();

    instance._mediaPrintListener({ matches: false });
    instance.state.printMode.should.be.false();
  });

  it('should set printMode when _beforePrint & _afterPrint is called', function () {
    const wrapper = shallow(<PrintableDummy/>);
    const instance = wrapper.instance();

    instance._beforePrint();
    instance.state.printMode.should.be.true();

    instance._afterPrint();
    instance.state.printMode.should.be.false();
  });
});
