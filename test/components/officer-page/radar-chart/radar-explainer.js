import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import RadarExplainer from 'components/officer-page/radar-chart/explainer';
import LeftNavigation from 'components/officer-page/radar-chart/explainer/left-navigation';
import RightNavigation from 'components/officer-page/radar-chart/explainer/right-navigation';
import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import PercentilesByYearExplainer from 'components/officer-page/radar-chart/explainer/percentiles-by-year';
import leftNavigationStyles from 'components/officer-page/radar-chart/explainer/left-navigation.sass';
import rightNavigationStyles from 'components/officer-page/radar-chart/explainer/right-navigation.sass';


describe('RadarExplainer components', function () {
  it('should render close button and TriangleExplainer as default', function () {
    const triangleEditWrapperStateProps = sinon.spy();
    const wrapper = shallow(<RadarExplainer triangleEditWrapperStateProps={ triangleEditWrapperStateProps }/>);

    wrapper.find('.radar-explainer-close-button').exists().should.be.true();
    const triangleExplainer = wrapper.find(TriangleExplainer);
    triangleExplainer.prop('editWrapperStateProps').should.eql(triangleEditWrapperStateProps);

    wrapper.find(LeftNavigation).dive().text().should.containEql('Percentiles by year');
    wrapper.find(RightNavigation).dive().text().should.containEql('What is the scale?');
  });

  it('should change to ScaleExplainer when click to RightNavigation', function () {
    const scaleEditWrapperStateProps = sinon.spy();
    const wrapper = mount(<RadarExplainer scaleEditWrapperStateProps={ scaleEditWrapperStateProps }/>);
    wrapper.find(TriangleExplainer).exists().should.be.true();
    wrapper.state('currentPaneIndex').should.equal(0);
    const rightNavigationElm = wrapper.find(`.${rightNavigationStyles.rightNavigation}`);
    rightNavigationElm.simulate('click');
    wrapper.state('currentPaneIndex').should.equal(1);
    const scaleExplainer = wrapper.find(ScaleExplainer);
    scaleExplainer.prop('editWrapperStateProps').should.eql(scaleEditWrapperStateProps);

    wrapper.find(LeftNavigation).text().should.containEql('What is this triangle?');
    wrapper.find(RightNavigation).text().should.containEql('Percentiles by year');
  });

  it('should change to PercentilesByYear when click to LeftNavigation', function () {
    const wrapper = mount(<RadarExplainer/>);
    wrapper.find(TriangleExplainer).exists().should.be.true();
    wrapper.state('currentPaneIndex').should.equal(0);
    const leftNavigationElm = wrapper.find(`.${leftNavigationStyles.leftNavigation}`);
    leftNavigationElm.simulate('click');
    wrapper.state('currentPaneIndex').should.equal(2);
    wrapper.find(PercentilesByYearExplainer).exists().should.be.true();

    wrapper.find(LeftNavigation).text().should.containEql('What is the scale?');
    wrapper.find(RightNavigation).text().should.containEql('What is this triangle?');
  });

  it('should change to PercentilesByYear when click to RightNavigation two times', function () {
    const wrapper = mount(<RadarExplainer/>);
    wrapper.find(TriangleExplainer).exists().should.be.true();
    wrapper.state('currentPaneIndex').should.equal(0);
    const rightNavigationElm = wrapper.find(`.${rightNavigationStyles.rightNavigation}`);
    rightNavigationElm.simulate('click');
    rightNavigationElm.simulate('click');
    wrapper.state('currentPaneIndex').should.equal(2);
    wrapper.find(PercentilesByYearExplainer).exists().should.be.true();
  });


  it('should invoke closeExplainer when clicking on close button', function () {
    const closeExplainerSpy = sinon.spy();
    const wrapper = shallow(<RadarExplainer closeExplainer={ closeExplainerSpy }/>);
    const closeButton = wrapper.find('.radar-explainer-close-button');
    closeButton.simulate('click');

    closeExplainerSpy.should.be.calledOnce();
  });
});
