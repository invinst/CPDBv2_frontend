import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import BottomSheet from 'components/bottom-sheet';
import { unmountComponentSuppressError } from 'utils/test';
import { CuratedReportFactory } from 'utils/test/factories/report';
import { CuratedFAQFactory } from 'utils/test/factories/faq';
import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';


describe('BottomSheet component', function () {
  let element;
  const mockStore = MockStore();
  const store = mockStore({});
  const report = CuratedReportFactory.build();
  const faq = CuratedFAQFactory.build();

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render nothing at first and eventually render bottom sheet when open become true', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ false }/>,
      rootEl);
    rootEl.children[0].children.length.should.equal(0);

    render(
      <BottomSheet open={ true }/>,
      rootEl, () => {
        setTimeout(() => {
          rootEl.children[0].children[0].nodeName.should.equal('DIV');
          callback();
        }, 300);
      });
  });

  it('should render bottom sheet at first and eventually render nothing when open become false', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ true }/>,
      rootEl);

    render(
      <BottomSheet open={ false }/>,
      rootEl, () => {
        rootEl.children[0].children[0].nodeName.should.equal('DIV');
        setTimeout(() => {
          rootEl.children[0].children.length.should.equal(0);
          callback();
        }, 1000);
      });
  });

  it('should render report when received report content', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <BottomSheet open={ true } content={ { type: REPORT_TYPE, props: { ...report } } }/>
      </Provider>
    );
    findDOMNode(element).innerHTML.should.containEql(report.fields.title.value.blocks[0].text);
  });

  it('should render faq when received faq content', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <BottomSheet open={ true } content={ { type: FAQ_TYPE, props: { ...faq } } }/>
      </Provider>
    );
    findDOMNode(element).innerHTML.should.containEql(faq.fields.question.value.blocks[0].text);
  });

  it('should render previous content when receive null content', function () {
    let rootEl = document.createElement('div');

    render(
      <Provider store={ store }>
        <BottomSheet open={ true } content={ { type: REPORT_TYPE, props: { ...report } } }/>
      </Provider>,
      rootEl);
    element = render(
      <Provider store={ store }>
        <BottomSheet open={ true } content={ null }/>
      </Provider>,
      rootEl);
    findDOMNode(element).innerHTML.should.containEql(report.fields.title.value.blocks[0].text);
  });
});
